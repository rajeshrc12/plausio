import { Request, Response } from "express"
import { env } from "@/config/env"
import { prisma, User } from "@workspace/db"
import { getThumbnailKey, getVideoKey } from "@/utils/video"
import {
  completeMultipartUpload,
  createMultipartUploadId,
  createMultipartUploadUrls,
  createPresignedUrl,
} from "@/services/s3"

export const initUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      fileName,
      fileSize,
      contentType,
      title,
      description,
      videoDuration,
      thumbnailName,
      thumbnailContentType,
    } = req.body
    const user = req.user as User

    const video = await prisma.video.create({
      data: {
        fileName,
        title,
        description,
        fileSize: fileSize.toString(),
        userId: user.id,
        status: "INITIATED",
        duration: Number(videoDuration),
      },
    })
    const videoKey = getVideoKey({ videoId: video.id, fileName })
    const thumbnailKey = getThumbnailKey({
      videoId: video.id,
      fileName: thumbnailName,
    })

    const videoUploadId = await createMultipartUploadId({
      key: videoKey,
      contentType,
    })
    const thumbnailUploadId = await createMultipartUploadId({
      key: thumbnailKey,
      contentType: thumbnailContentType,
    })

    if (!videoUploadId) {
      throw new Error("videoUploadId not returned from S3")
    }
    if (!thumbnailUploadId) {
      throw new Error("thumbnailUploadId not returned from S3")
    }
    const totalParts = Math.ceil(fileSize / env.AWS_S3_PART_SIZE_IN_MB)

    const videoUrls = await createMultipartUploadUrls({
      totalParts,
      key: videoKey,
      uploadId: videoUploadId,
    })
    const thumbnailUrl = await createMultipartUploadUrls({
      key: thumbnailKey,
      uploadId: thumbnailUploadId,
    })

    res.status(200).json({
      video,
      videoUploadId,
      thumbnailUploadId,
      videoKey,
      thumbnailKey,
      videoUrls,
      thumbnailUrl,
      videoPartSize: env.AWS_S3_PART_SIZE_IN_MB,
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
      videoUploadId,
      thumbnailUploadId,
      videoKey,
      thumbnailKey,
      videoParts,
      thumbnailParts,
      videoId,
    } = req.body

    await completeMultipartUpload({
      key: videoKey,
      parts: videoParts,
      uploadId: videoUploadId,
    })
    await completeMultipartUpload({
      key: thumbnailKey,
      parts: thumbnailParts,
      uploadId: thumbnailUploadId,
    })
    const video = await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        status: "UPLOADED",
        videoKey,
        thumbnailKey,
      },
    })
    res.status(200).json({
      video,
      message: "Upload completed successfully",
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

export const getVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as User
    const { id } = req.params
    const video = await prisma.video.findFirst({
      where: {
        userId: user.id,
        id: Number(id),
      },
    })

    const url = await createPresignedUrl(video.videoKey)
    res.status(200).json({ ...video, url })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to complete upload",
    })
  }
}
