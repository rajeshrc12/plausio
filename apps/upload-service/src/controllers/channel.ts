import { prisma, Channel } from "@workspace/db"
import { Request, Response } from "express"

export const getChannel = async (req: Request, res: Response) => {
  try {
    const { id } = req.channel as Channel
    const { name } = req.params
    const handle = name?.slice(1)
    const channel = await prisma.channel.findFirst({
      where: { handle },
      include: {
        _count: {
          select: {
            videos: true,
            subscribers: true,
          },
        },
        videos: true,
      },
    })
    const subscribe = await prisma.subscription.findFirst({
      where: {
        subscriberId: id,
        channelId: channel.id,
      },
    })
    const totalViews = await prisma.video.aggregate({
      where: {
        channelId: channel.id,
      },
      _sum: {
        views: true,
      },
    })
    const result = {
      ...channel,
      videoCount: channel?._count.videos ?? 0,
      subscribersCount: channel?._count.subscribers ?? 0,
      views: totalViews._sum.views ?? 0,
      isSubscribed: !!subscribe,
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

export const getMyChannel = async (req: Request, res: Response) => {
  try {
    const { id } = req.channel as Channel

    const [channel, totalViews] = await Promise.all([
      prisma.channel.findUnique({
        where: { id },
        include: {
          videos: true,

          subscriptions: {
            include: {
              channel: true,
            },
          },

          subscribers: {
            include: {
              subscriber: true,
            },
          },
        },
      }),

      prisma.video.aggregate({
        where: { channelId: id },
        _sum: {
          views: true,
        },
      }),
    ])

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      })
    }

    res.json({
      ...channel,
      videoCount: channel.videos.length,
      subscribersCount: channel.subscribers.length,
      subscriptionsCount: channel.subscriptions.length,
      views: totalViews._sum.views ?? 0,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Something went wrong",
    })
  }
}

export const subscribeChannel = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.body
    const channelData = req.channel as Channel
    const subscriberId = channelData.id
    const subscribe = await prisma.subscription.create({
      data: {
        subscriberId,
        channelId,
      },
    })
    res.json(subscribe)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Channel not found",
    })
  }
}

export const unsubscribeChannel = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.body
    const channelData = req.channel as Channel
    const subscriberId = channelData.id
    const unsubscribe = await prisma.subscription.delete({
      where: {
        subscriberId_channelId: {
          subscriberId,
          channelId,
        },
      },
    })
    res.json(unsubscribe)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Channel not found",
    })
  }
}
