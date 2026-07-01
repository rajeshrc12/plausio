import { Request, Response } from "express"
import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompletedPart,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { s3 } from "@/config/s3"
import { env } from "@/config/env"
import { prisma, User } from "@workspace/db"
import { getVideoKey } from "@/utils/video"

export const initUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fileName, fileSize, contentType, title, description } = req.body
    const user = req.user as User

    const video = await prisma.video.create({
      data: {
        fileName,
        title,
        description,
        fileSize: fileSize.toString(),
        userId: user.id,
        status: "INITIATED",
      },
    })
    const key = getVideoKey({ videoId: video.id, fileName })

    const { UploadId } = await s3.send(
      new CreateMultipartUploadCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: key,
        ContentType: contentType,
      })
    )

    if (!UploadId) {
      throw new Error("UploadId not returned from S3")
    }

    const totalParts = Math.ceil(fileSize / env.AWS_S3_PART_SIZE_IN_MB)

    const urls = await Promise.all(
      Array.from({ length: totalParts }, async (_, index) => {
        const partNumber = index + 1

        const command = new UploadPartCommand({
          Bucket: env.AWS_S3_BUCKET,
          Key: key,
          UploadId,
          PartNumber: partNumber,
        })

        const url = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        })

        return {
          partNumber,
          url,
        }
      })
    )
    res.status(200).json({
      video,
      uploadId: UploadId,
      key,
      partSize: env.AWS_S3_PART_SIZE_IN_MB,
      urls,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to initialize upload",
    })
  }
}

export const completeUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      uploadId,
      key,
      parts,
      videoId,
    }: {
      uploadId: string
      key: string
      parts: CompletedPart[]
      videoId: string
    } = req.body

    const result = await s3.send(
      new CompleteMultipartUploadCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: parts,
        },
      })
    )
    const video = await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        status: "UPLOADED",
      },
    })
    res.status(200).json({
      video,
      message: "Upload completed successfully",
      location: result.Location,
      key,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to complete upload",
    })
  }
}

export const getVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as User
    const videos = await prisma.video.findMany({
      where: {
        userId: user.id,
      },
    })
    res.status(200).json(videos)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to complete upload",
    })
  }
}
