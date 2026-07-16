import { env } from "@/config/env"
import { uploadFiles } from "@/services/video"
import { Id } from "@/types/controller"
import { Channel, prisma } from "@workspace/db"
import { Request, Response } from "express"

export const initUpload = async (req: Request, res: Response) => {
  const { file, thumbnail: t } = req.body
  const channel = req.channel as Channel

  const video = await prisma.video.create({
    data: {
      title: file.title,
      description: file.description,
      visibility: file.visibility.toUpperCase(),
      duration: file.duration,
      size: file.size,
      name: file.name,
      type: file.type,
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
    videoType: file.type,
    videoSize: file.size,
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

export const getRecommondVideos = async (_req: Request, res: Response) => {
  const videos = await prisma.video.findMany()
  res.status(200).json(videos)
}

export const getPublicVideos = async (_req: Request, res: Response) => {
  const videos = await prisma.video.findMany()
  res.status(200).json(videos)
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
