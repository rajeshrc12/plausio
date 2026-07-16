import { env } from "@/config/env"
import { completeMultipartUpload } from "@/services/s3"
import { uploadFiles } from "@/services/video"
import { Id } from "@/types/controller"
import { Channel, prisma, VideoStatus } from "@workspace/db"
import { Request, Response } from "express"

export const initUpload = async (req: Request, res: Response) => {
  const { video: v, thumbnail: t } = req.body
  const channel = req.channel as Channel

  const video = await prisma.video.create({
    data: {
      title: v.title,
      description: v.description,
      visibility: v.visibility.toUpperCase(),
      duration: v.duration,
      size: v.size,
      name: v.name,
      type: v.type,
      channelId: channel.id,
    },
  })
  const thumbnail = await prisma.thumbnail.create({
    data: {
      type: t.type,
      size: t.size,
      name: t.name,
      videoId: video.id,
    },
  })

  const {
    videoUrls,
    thumbnailUrl,
    videoKey,
    thumbnailKey,
    videoUploadId,
    thumbnailUploadId,
  } = await uploadFiles({
    videoId: video.id,
    videoType: v.type,
    videoSize: v.size,
    thumbnailType: thumbnail.type,
  })

  res.status(201).json({
    video,
    thumbnail,
    videoKey,
    thumbnailKey,
    videoUploadId,
    thumbnailUploadId,
    videoUrls,
    thumbnailUrl,
    videoPartSize: env.AWS_S3_PART_SIZE_IN_MB,
  })
}

export const completeUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    videoId,
    videoKey,
    videoUploadId,
    videoParts,
    thumbnailKey,
    thumbnailUploadId,
    thumbnailParts,
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
      status: VideoStatus.UPLOADED,
    },
  })
  res.status(201).json({
    video,
    message: "Upload completed successfully",
  })
}

export const getRecommondVideos = async (_req: Request, res: Response) => {
  const videos = await prisma.video.findMany()
  res.status(200).json(videos)
}

export const getPublicVideos = async (_req: Request, res: Response) => {
  const videos = await prisma.video.findMany({ include: { channel: true } })
  res.status(200).json(videos)
}
export const getPublicVideo = async (req: Request<Id>, res: Response) => {
  const { id } = req.params

  const video = await prisma.video.findFirst({
    where: { id: Number(id) },
    include: { channel: true },
  })
  res.status(200).json(video)
}
export const getMyVideos = async (_req: Request, res: Response) => {
  const videos = await prisma.video.findMany()
  res.status(200).json(videos)
}

export const getVideo = async (req: Request<Id>, res: Response) => {
  const { id } = req.params
  const video = await prisma.video.findFirst({ where: { id: Number(id) } })
  res.status(200).json(video)
}
