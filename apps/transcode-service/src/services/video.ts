import { env } from "@/config/env"

import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"

import { createReadStream, createWriteStream, promises as fs } from "node:fs"
import { pipeline } from "node:stream/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { promisify } from "node:util"
import { execFile } from "node:child_process"
import { s3 } from "@/config/s3"

interface VideoJob {
  id: string
  type: string
}

const execFileAsync = promisify(execFile)

const TARGET_RESOLUTIONS = [1080, 720, 480]

export const createVideoResolution = async ({ id, type }: VideoJob) => {
  const bucket = env.AWS_S3_BUCKET
  const key = `${env.AWS_S3_BUCKET_VIDEO_PATH}/${id}/original`

  const inputFile = join(tmpdir(), `${id}.${type}`)

  try {
    // Download original video
    const { Body } = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    )

    if (!Body) {
      throw new Error("Video not found")
    }

    await pipeline(Body as NodeJS.ReadableStream, createWriteStream(inputFile))

    // Get video resolution
    const { stdout } = await execFileAsync("ffprobe", [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height",
      "-of",
      "json",
      inputFile,
    ])

    const metadata = JSON.parse(stdout)
    const stream = metadata.streams[0]

    const sourceHeight = stream.height

    console.log(`Original Resolution: ${stream.width}x${sourceHeight}`)

    // Only create lower resolutions
    const targets = TARGET_RESOLUTIONS.filter(
      (resolution) => resolution < sourceHeight
    )

    for (const resolution of targets) {
      const outputFile = join(tmpdir(), `${id}-${resolution}.${type}`)

      console.log(`Creating ${resolution}p...`)

      await execFileAsync("ffmpeg", [
        "-y",
        "-i",
        inputFile,
        "-vf",
        `scale=-2:${resolution}`,
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "23",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-movflags",
        "+faststart",
        outputFile,
      ])

      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: `${env.AWS_S3_BUCKET_VIDEO_PATH}/${id}/${resolution}`,
          Body: createReadStream(outputFile),
          ContentType: `video/${type}`,
        })
      )

      console.log(`Uploaded ${resolution}p`)

      await fs.unlink(outputFile)
    }
  } finally {
    await fs.unlink(inputFile).catch(() => {})
  }
}
