import { env } from "@/config/env"

import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"

import { createReadStream, createWriteStream, promises as fs } from "node:fs"
import { pipeline } from "node:stream/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { s3 } from "@/config/s3"
import { mkdir, readdir, rm } from "node:fs/promises"
import { spawn } from "node:child_process"
import { getExtensionFromMimeType } from "@/utils/mime"

interface VideoJob {
  id: string
  type: string
}

export const createVideoResolution = async ({ id, type }: VideoJob) => {
  const bucket = env.AWS_S3_BUCKET
  const baseKey = `${env.AWS_S3_BUCKET_VIDEO_PATH}/${id}`

  const workDir = join(tmpdir(), String(id))

  try {
    const extension = getExtensionFromMimeType(type)

    console.log("========================================")
    console.log(`[${id}] Starting video processing`)
    console.log(`[${id}] File type: ${type}`)
    console.log(`[${id}] Extension: ${extension}`)

    const hlsDir = join(workDir, "hls")
    const inputFile = join(workDir, `original.${extension}`)

    await mkdir(hlsDir, { recursive: true })

    // ---------------- Download ----------------
    console.log(`[${id}] Downloading original video...`)

    const { Body } = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: `${baseKey}/original`,
      })
    )

    if (!Body) {
      throw new Error("Video not found")
    }

    await pipeline(Body as NodeJS.ReadableStream, createWriteStream(inputFile))

    console.log(`[${id}] ✅ Download completed`)

    // ---------------- Processing ----------------
    console.log(`[${id}] Processing video with FFmpeg...`)

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

        "-crf",
        "23",

        "-hls_time",
        "6",

        "-hls_playlist_type",
        "vod",

        "-hls_segment_filename",
        join(hlsDir, "segment_%03d.ts"),

        join(hlsDir, "index.m3u8"),
      ])

      ffmpeg.stderr.on("data", (data) => {
        console.log(`[FFmpeg ${id}] ${data.toString().trim()}`)
      })

      ffmpeg.on("error", reject)

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          console.log(`[${id}] ✅ FFmpeg processing completed`)
          resolve()
        } else {
          reject(new Error(`ffmpeg exited with code ${code}`))
        }
      })
    })

    // ---------------- Upload ----------------
    const files = await readdir(hlsDir)

    console.log(`[${id}] Uploading ${files.length} HLS file(s) to S3...`)

    await Promise.all(
      files.map(async (file) => {
        console.log(`[${id}] Uploading ${file}...`)

        const contentType = file.endsWith(".m3u8")
          ? "application/vnd.apple.mpegurl"
          : "video/mp2t"

        await s3.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: `${baseKey}/hls/${file}`,
            Body: createReadStream(join(hlsDir, file)),
            ContentType: contentType,
          })
        )

        console.log(`[${id}] ✅ Uploaded ${file}`)
      })
    )

    // ---------------- Success ----------------
    console.log(`[${id}] 🎉 Upload completed`)
    console.log(`[${id}] Video processing finished successfully`)
    console.log("========================================")
  } catch (err) {
    console.error(`[${id}] ❌ Video processing failed`)
    console.error(err)
  } finally {
    await rm(workDir, {
      recursive: true,
      force: true,
    })

    console.log(`[${id}] Temporary files cleaned up`)
  }
}
