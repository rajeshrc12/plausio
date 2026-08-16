import { spawn } from "node:child_process";
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join, relative } from "node:path";
import { pipeline } from "node:stream/promises";

import pLimit from "p-limit";

import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { env } from "../config/env.js";
import { s3 } from "../config/s3.js";
import { getAudioStreams, getVideoInfo } from "../utils/ffmpeg.js";
import { getExtensionFromMimeType } from "../utils/mime.js";
import { variants } from "../utils/option.js";

export const downloadMovie = async ({
  bucket,
  baseKey,
  fileName,
  inputFile,
}: {
  bucket: string;
  baseKey: string;
  fileName: string;
  inputFile: string;
  hlsDir: string;
}) => {
  console.log(`1. Downloading original video...`);

  const { Body } = await s3.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: `${baseKey}/${fileName}`,
    }),
  );

  if (!Body) {
    throw new Error(`Video not found`);
  }

  await pipeline(Body as NodeJS.ReadableStream, createWriteStream(inputFile));

  console.log(`Downloading completed`);
};

export const createMovieData = async ({
  id,
  type,
}: {
  id: number;
  type: string;
}) => {
  const bucket = env.AWS_S3_BUCKET;
  const baseKey = `${env.AWS_S3_BUCKET_VIDEO_PATH}/${id}`;
  const extension = getExtensionFromMimeType(type);
  const fileName = `original`;

  const workDir = join(tmpdir(), String(id));
  // const workDir = join();
  await mkdir(workDir, { recursive: true });

  const hlsDir = join(workDir, "hls");
  await mkdir(hlsDir, { recursive: true });

  const inputFile = join(workDir, `original.${extension}`);
  return {
    bucket,
    baseKey,
    fileName,
    workDir,
    hlsDir,
    inputFile,
  };
};

export const createMovieSegments = async ({
  inputFile,
  hlsDir,
}: {
  inputFile: string;
  hlsDir: string;
}) => {
  console.log("2. Creating HLS folders...");

  const audioStreams = await getAudioStreams(inputFile);
  const audioCount = audioStreams.length;

  await mkdir(join(hlsDir, "720p"), { recursive: true });
  await mkdir(join(hlsDir, "480p"), { recursive: true });

  for (let i = 0; i < audioCount; i++) {
    await mkdir(join(hlsDir, `audio_${i}`), {
      recursive: true,
    });
  }

  console.log("HLS folders created");
  const { fps } = await getVideoInfo(inputFile);

  const segmentDuration = 6;
  const gop = Math.round(fps * segmentDuration);

  const args: string[] = ["-y", "-i", inputFile];

  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];

    args.push(
      "-map",
      "0:v:0",
      `-filter:v:${i}`,
      `scale=-2:${variant.height}`,
      `-c:v:${i}`,
      "libx264",
      `-preset:v:${i}`,
      "veryfast",
      `-b:v:${i}`,
      variant.bitrate,
      `-maxrate:v:${i}`,
      variant.maxrate,
      `-bufsize:v:${i}`,
      variant.bufsize,

      `-g:v:${i}`,
      String(gop),

      `-keyint_min:v:${i}`,
      String(gop),

      `-sc_threshold:v:${i}`,
      "0",
    );
  }

  args.push(
    "-f",
    "hls",
    "-hls_time",
    String(segmentDuration),
    "-hls_playlist_type",
    "vod",
    "-hls_segment_type",
    "mpegts",

    "-var_stream_map",
    variants.map((variant, i) => `v:${i},name:${variant.name}`).join(" "),

    "-hls_segment_filename",
    join(hlsDir, "%v", "segment_%03d.ts"),

    join(hlsDir, "%v", "playlist.m3u8"),
  );

  await runFfmpeg(args);

  const audioArgs = ["-y", "-i", inputFile];

  const audioVariants = [];

  for (let i = 0; i < audioStreams.length; i++) {
    const audio = audioStreams[i];

    audioArgs.push("-map", `0:${audio.index}`, `-c:a:${i}`, "copy");

    audioVariants.push(`a:${i},name:audio_${i}`);
  }

  if (audioStreams.length > 0) {
    audioArgs.push(
      "-f",
      "hls",
      "-hls_time",
      "6",
      "-hls_playlist_type",
      "vod",
      "-hls_segment_type",
      "mpegts",

      "-var_stream_map",
      audioVariants.join(" "),

      "-hls_segment_filename",
      join(hlsDir, "%v", "segment_%03d.ts"),

      join(hlsDir, "%v", "playlist.m3u8"),
    );

    await runFfmpeg(audioArgs);
  }
  console.log("HLS segments created successfully");

  const master: string[] = ["#EXTM3U", "#EXT-X-VERSION:3", ""];

  for (let i = 0; i < audioStreams.length; i++) {
    const audio = audioStreams[i];

    master.push(
      `#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="${audio.languageName}",LANGUAGE="${audio.language}",DEFAULT=${audio.language === "eng" ? "YES" : "NO"},AUTOSELECT=YES,URI="audio_${i}/playlist.m3u8"`,
    );
  }

  master.push("");

  for (const variant of variants) {
    const bandwidth = parseInt(variant.maxrate, 10) * 1000;

    master.push(
      `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${variant.width}x${variant.height},AUDIO="audio"`,
      `${variant.name}/playlist.m3u8`,
      "",
    );
  }

  await writeFile(join(hlsDir, "master.m3u8"), master.join("\n"), "utf8");
};

const runFfmpeg = (args: string[]) => {
  return new Promise((resolve, reject) => {
    console.log("Running:", "ffmpeg", args.join(" "));

    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.stderr.on("data", (data) => {
      process.stdout.write(data);
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
};

interface UploadHlsOptions {
  bucket: string;
  baseKey: string;
  hlsDir: string;
  concurrency?: number;
}

export async function uploadHlsDir({
  bucket,
  baseKey,
  hlsDir,
  concurrency = 5,
}: UploadHlsOptions): Promise<void> {
  const files = await collectFiles(hlsDir);

  console.log(`Found ${files.length} HLS files`);

  const limit = pLimit(concurrency);

  let completed = 0;

  await Promise.all(
    files.map((filePath) =>
      limit(async () => {
        const relativePath = relative(hlsDir, filePath);

        const s3Key = `${baseKey.replace(/\/+$/, "")}/${relativePath}`;

        const fileStat = await stat(filePath);
        await s3.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: s3Key,
            Body: createReadStream(filePath),
            ContentLength: fileStat.size,
            ContentType: getContentType(filePath),
          }),
        );

        completed++;

        console.log(`[${completed}/${files.length}] Uploaded ${s3Key}`);
      }),
    ),
  );

  console.log(`Successfully uploaded ${completed}/${files.length} HLS files`);
}

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, {
    withFileTypes: true,
  });

  const files: string[] = [];

  for (const entry of entries) {
    const filePath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(filePath)));
    } else if (entry.isFile()) {
      files.push(filePath);
    }
  }

  return files;
}

function getContentType(filePath: string): string {
  switch (extname(filePath).toLowerCase()) {
    case ".m3u8":
      return "application/vnd.apple.mpegurl";

    case ".ts":
      return "video/mp2t";

    default:
      return "application/octet-stream";
  }
}
