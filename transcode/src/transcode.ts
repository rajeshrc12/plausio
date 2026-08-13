import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import path from "path";
import { fileURLToPath } from "url";
import { getAudioStreams } from "./utils/audio.ts";
import { variants } from "./utils/option.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const s3Path = path.join(__dirname, "../s3");

const worker = async () => {
  const { id, extension } = {
    id: 1,
    extension: "mkv",
  };

  const workDir = join(`${s3Path}/video`, String(id));
  const hlsDir = join(workDir, "hls");
  const inputFile = join(workDir, `original.${extension}`);

  const audioStreams = await getAudioStreams(inputFile);

  // For now, manually set this.
  const audioCount = audioStreams.length;

  try {
    console.log(`[${id}] Starting HLS processing`);

    await mkdir(hlsDir, { recursive: true });
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

    console.log(`[${id}] HLS processing completed`);
  } catch (err) {
    console.error(`[${id}] HLS processing failed`);
    console.error(err);
  }
};

worker();
