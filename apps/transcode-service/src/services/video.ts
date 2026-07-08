import { env } from "@/config/env"

import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"

import { createReadStream, createWriteStream, promises as fs } from "node:fs"
import { pipeline } from "node:stream/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { s3 } from "@/config/s3"
import { mkdir, readdir, rm } from "node:fs/promises"
import { spawn } from "node:child_process"

interface VideoJob {
  id: string
  type: string
}

export const createVideoResolution = async ({ id, type }: VideoJob) => {
  const bucket = env.AWS_S3_BUCKET
  const baseKey = `${env.AWS_S3_BUCKET_VIDEO_PATH}/${id}`

  // /tmp/<id>
  const workDir = join(tmpdir(), String(id))
  const hlsDir = join(workDir, "hls")
  const inputFile = join(workDir, `original.${type}`)

  await mkdir(hlsDir, { recursive: true })

  try {
    // Download original video
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

    // Generate HLS
    await new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-y",

        "-i",
        inputFile,

        // First video stream
        "-map",
        "0:v:0",

        // First audio stream (optional)
        "-map",
        "0:a:0?",

        // Video encoding
        "-c:v",
        "libx264",

        // Audio encoding
        "-c:a",
        "aac",

        "-preset",
        "veryfast",

        "-crf",
        "23",

        // HLS options
        "-hls_time",
        "6",

        "-hls_playlist_type",
        "vod",

        "-hls_segment_filename",
        join(hlsDir, "segment_%03d.ts"),

        join(hlsDir, "index.m3u8"),
      ])

      ffmpeg.stderr.on("data", (data) => {
        console.log(data.toString())
      })

      ffmpeg.on("error", reject)

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`ffmpeg exited with code ${code}`))
        }
      })
    })

    // Upload HLS files
    const files = await readdir(hlsDir)

    await Promise.all(
      files.map(async (file) => {
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
      })
    )
  } finally {
    await rm(workDir, {
      recursive: true,
      force: true,
    })
  }
}
