import { Id } from "@/types/controller"
import { prisma, Video } from "@workspace/db"
import { Request, Response } from "express"

export const addVideo = async (req: Request<Video>, res: Response) => {
  try {
    const videoData = req.body
    const video = await prisma.video.create({ data: videoData })
    res.status(200).json(video)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
export const getRecommondVideos = async (_req: Request, res: Response) => {
  try {
    const videos = await prisma.video.findMany()
    res.status(200).json(videos)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
export const getPublicVideos = async (_req: Request, res: Response) => {
  try {
    const videos = await prisma.video.findMany()
    res.status(200).json(videos)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
export const getVideo = async (req: Request<Id>, res: Response) => {
  try {
    const { id } = req.params
    const video = await prisma.video.findFirst({ where: { id: Number(id) } })
    res.status(200).json(video)
  } catch (error) {
    res.status(500).json(error)
  }
}
