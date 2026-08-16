import { env } from "../config/env.js";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream, createWriteStream, promises as fs } from "node:fs";
import { pipeline } from "node:stream/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdir, readdir, rm, writeFile, stat } from "node:fs/promises";
import { spawn } from "node:child_process";
import pLimit from "p-limit";
import { getExtensionFromMimeType } from "../utils/mime.js";
import { s3 } from "../config/s3.js";
import axios from "axios";
import { getAudioStreams } from "../utils/audio.js";
import { variants } from "../utils/option.js";

type Video = {
  id: number;
  type: string;
  key: string;
};
export const worker = async (video: Video) => {
  const { id, type } = video;

  const bucket = env.AWS_S3_BUCKET;
  const baseKey = `${env.AWS_S3_BUCKET_VIDEO_PATH}/${id}`;

  const workDir = join(tmpdir(), String(id));

  try {
    const extension = getExtensionFromMimeType(type);

    console.log("========================================");
    console.log(`[${id}] Starting video processing`);
    console.log(`[${id}] File type: ${type}`);
    console.log(`[${id}] Extension: ${extension}`);

    const hlsDir = join(workDir, "hls");
    const inputFile = join(workDir, `original.${extension}`);

    await mkdir(hlsDir, { recursive: true });

    // ---------------- Download ----------------
    console.log(`[${id}] Downloading original video...`);

    const { Body } = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: `${baseKey}/original`,
      }),
    );

    if (!Body) {
      throw new Error("Video not found");
    }

    await pipeline(Body as NodeJS.ReadableStream, createWriteStream(inputFile));

    console.log(`[${id}] ✅ Download completed`);

    // ---------------- Processing ----------------
    console.log(`[${id}] Processing video with FFmpeg...`);
    const audioStreams = await getAudioStreams(inputFile);
    const audioCount = audioStreams.length;

    await mkdir(join(hlsDir, "720p"), { recursive: true });
    await mkdir(join(hlsDir, "480p"), { recursive: true });

    for (let i = 0; i < audioCount; i++) {
      await mkdir(join(hlsDir, `audio_${i}`), {
        recursive: true,
      });
    }
    const args = ["-y", "-i", inputFile];

    variants.forEach((variant, index) => {
      args.push(
        "-map",
        "0:v:0",

        `-c:v:${index}`,
        "libx264",

        "-preset",
        "veryfast",

        `-b:v:${index}`,
        variant.bitrate,

        `-s:v:${index}`,
        variant.size,

        "-an",

        "-f",
        "hls",

        "-hls_time",
        "6",

        "-hls_playlist_type",
        "vod",

        "-hls_segment_filename",
        join(hlsDir, variant.name, "segment_%03d.ts"),

        join(hlsDir, variant.name, "index.m3u8"),
      );
    });

    // --------------------
    // Audio
    // --------------------

    for (let i = 0; i < audioCount; i++) {
      args.push(
        "-map",
        `0:a:${i}`,

        "-c:a",
        "aac",

        "-b:a",
        "128k",

        "-f",
        "hls",

        "-hls_time",
        "6",

        "-hls_playlist_type",
        "vod",

        "-hls_segment_filename",
        join(hlsDir, `audio_${i}`, "segment_%03d.ts"),

        join(hlsDir, `audio_${i}`, "index.m3u8"),
      );
    }

    await new Promise((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", args);

      ffmpeg.stderr.on("data", (data) => {
        console.log(`[FFmpeg ${id}] ${data.toString().trim()}`);
      });

      ffmpeg.on("error", reject);

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve(1);
        } else {
          reject(new Error(`FFmpeg exited with code ${code}`));
        }
      });
    });

    // --------------------
    // Master playlist
    // --------------------

    const master = ["#EXTM3U", "#EXT-X-VERSION:3", ""];

    for (let i = 0; i < audioCount; i++) {
      master.push(
        `#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="${audioStreams[i].languageName}",DEFAULT=${audioStreams[i].language === "eng" ? "YES" : "NO"},AUTOSELECT=YES,URI="audio_${i}/index.m3u8"`,
      );
    }

    master.push(
      "",
      '#EXT-X-STREAM-INF:BANDWIDTH=4000000,RESOLUTION=1280x720,AUDIO="audio"',
      "720p/index.m3u8",
      "",
      '#EXT-X-STREAM-INF:BANDWIDTH=1800000,RESOLUTION=854x480,AUDIO="audio"',
      "480p/index.m3u8",
      "",
    );

    await writeFile(join(hlsDir, "master.m3u8"), master.join("\n"));

    // ---------------- Upload ----------------
    const entries = await readdir(hlsDir, { recursive: true });

    const files = [];

    for (const file of entries) {
      const filePath = join(hlsDir, file);
      const stats = await stat(filePath);

      if (stats.isFile()) {
        files.push(file);
      }
    }

    console.log(`[${id}] Uploading ${files.length} HLS file(s) to S3...`);

    const limit = pLimit(8);

    await Promise.all(
      files.map((file) =>
        limit(async () => {
          const filePath = join(hlsDir, file);

          console.log(`[${id}] Uploading ${file}...`);

          const contentType = file.endsWith(".m3u8")
            ? "application/vnd.apple.mpegurl"
            : file.endsWith(".ts")
              ? "video/mp2t"
              : "application/octet-stream";

          await s3.send(
            new PutObjectCommand({
              Bucket: bucket,
              Key: `${baseKey}/hls/${file.replaceAll("\\", "/")}`,
              Body: createReadStream(filePath),
              ContentType: contentType,
            }),
          );

          console.log(`[${id}] Uploaded ${file}`);
        }),
      ),
    );

    // ---------------- Success ----------------
    console.log(`[${id}] 🎉 Upload completed`);
    console.log(`[${id}] Video processing finished successfully`);
    console.log("========================================");
    updateMovieStatus({ id, status: "COMPLETED" });
  } catch (err) {
    updateMovieStatus({ id, status: "FAILED" });
    console.error(`[${id}] ❌ Video processing failed`);
    console.error(err);
  } finally {
    await rm(workDir, {
      recursive: true,
      force: true,
    });

    console.log(`[${id}] Temporary files cleaned up`);
  }
};
export async function updateMovieStatus({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  try {
    const response = await axios.post(
      `${env.UPLOAD_SERVICE_API_URL}/api/movie/status`,
      {
        id,
        status,
      },
    );
    console.log("success", await response.data);
  } catch (e) {
    console.log("error while updating movie status", e);
  }
}
