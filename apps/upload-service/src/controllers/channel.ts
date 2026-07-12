import { prisma, Channel } from "@workspace/db"
import { Request, Response } from "express"

export const getChannel = async (req: Request, res: Response) => {
  try {
    const channelData = req?.channel as Channel
    const channel = await prisma.channel.findFirst({
      where: { id: channelData.id },
      include: {
        _count: {
          select: {
            videos: true,
            subscribers: true,
          },
        },
      },
    })
    const totalViews = await prisma.video.aggregate({
      where: {
        channelId: channelData.id,
      },
      _sum: {
        views: true,
      },
    })
    const result = {
      ...channel,
      videos: channel?._count.videos ?? 0,
      subscribers: channel?._count.subscribers ?? 0,
      views: totalViews._sum.views ?? 0,
    }

    delete result._count

    res.json(result)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Channel not found",
    })
  }
}
