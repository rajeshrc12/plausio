import { Request, Response } from "express"
import { prisma, Channel } from "@workspace/db"

export const initUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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

    res.status(200).json({ video, thumbnail })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to initialize upload",
    })
  }
}

export const getVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const channel = req.channel as Channel

    const videos = await prisma.video.findMany({
      where: {
        channelId: channel.id,
      },
    })

    res.status(200).json(videos)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to fetch videos",
    })
  }
}

export const getVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const videos = await prisma.video.findFirst({
      where: {
        id: Number(id),
      },
      include: { channel: true, comments: true },
    })

    res.status(200).json(videos)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to fetch videos",
    })
  }
}

export const getRecommendedVideos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const videos = await prisma.video.findMany({
      include: { channel: true },
    })

    res.status(200).json(videos)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to fetch videos",
    })
  }
}
