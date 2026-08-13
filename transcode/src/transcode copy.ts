import path from "path";
import { fileURLToPath } from "url";
import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const s3Path = path.join(__dirname, "../s3");

const worker = async () => {
  const { id, extension } = { id: 1, extension: "mkv" };

  const workDir = join(`${s3Path}/video`, String(id));

  try {
    console.log(`[${id}] Starting video processing`);

    const hlsDir = join(workDir, "hls");
    const inputFile = join(workDir, `original.${extension}`);

    await mkdir(hlsDir, { recursive: true });

    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-y",
        "-i",
        inputFile,

        "-map",
        "0:v:0",

        "-map",
        "0:a:0?",

        "-c:v",
        "libx264",

        "-c:a",
        "aac",

        "-preset",
        "veryfast",

        "-hls_time",
        "6",

        "-hls_playlist_type",
        "vod",

        "-hls_segment_filename",
        join(hlsDir, "segment_%03d.ts"),

        join(hlsDir, "index.m3u8"),
      ]);

      ffmpeg.stderr.on("data", (data) => {
        console.log(`[FFmpeg ${id}] ${data.toString().trim()}`);
      });

      ffmpeg.on("error", reject);

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          console.log(`[${id}] ✅ FFmpeg processing completed`);
          resolve();
        } else {
          reject(new Error(`ffmpeg exited with code ${code}`));
        }
      });
    });

    console.log(`[${id}] 🎉 Transcode completed`);
  } catch (err) {
    console.error(`[${id}] ❌ Video processing failed`);
    console.error(err);
  }
};

worker();
