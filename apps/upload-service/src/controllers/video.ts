import { Id } from "@/types/controller"
import { prisma, Video } from "@workspace/db"
import { Request, Response } from "express"

export const addVideo = async (req: Request<Video>, res: Response) => {
  const videoData = req.body
  const video = await prisma.video.create({ data: videoData })
  res.status(200).json(video)
}

export const getRecommondVideos = async (_req: Request, res: Response) => {
  const videos = await prisma.video.findMany()
  res.status(200).json(videos)
}

export const getPublicVideos = async (_req: Request, res: Response) => {
  const videos = await prisma.video.findMany()
  res.status(200).json(videos)
}

export const getVideo = async (req: Request<Id>, res: Response) => {
  const { id } = req.params
  const video = await prisma.video.findFirst({ where: { id: Number(id) } })
  res.status(200).json(video)
}
