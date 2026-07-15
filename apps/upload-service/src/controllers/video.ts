import { prisma } from "@workspace/db"
import { Request, Response } from "express"

export const addVideo = async (req: Request, res: Response) => {
  try {
    const videoData = req.body
    const video = await prisma.video.create({ data: videoData })
    res.status(200).json(video)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to create video",
    })
  }
}
export const getVideos = async (_req: Request, res: Response) => {
  try {
    const videos = await prisma.video.findMany()
    res.status(200).json(videos)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to create video",
    })
  }
}
