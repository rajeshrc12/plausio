import { AppError } from "@/utils/errorHandler"
import { Channel, prisma, VideoStatus } from "@workspace/db"
import { Request, Response } from "express"

export const getChannel = async (req: Request, res: Response) => {
  const { handle } = req.params
  if (!handle) throw new AppError("Channel handle is required", 500, "fail")
  const channel = await prisma.channel.findFirst({
    where: {
      handle: String(handle.slice(1)),
    },
    include: {
      videos: true,
      subscriptions: {
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          subscribers: true,
        },
      },
    },
  })
  const view = await prisma.video.aggregate({
    where: {
      channelId: channel?.id,
    },
    _sum: {
      views: true,
    },
  })
  const data = {
    ...channel,
    subscribers: channel?._count.subscribers,
    views: view._sum.views ?? 0,
  }
  delete data._count
  res.status(200).json(data)
}
export const getMyChannel = async (req: Request, res: Response) => {
  const myChannel = req.channel as Channel

  const channel = await prisma.channel.findFirst({
    where: {
      id: myChannel.id,
    },
    include: {
      videos: {
        where: {
          status: VideoStatus.UPLOADED,
        },
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          _count: {
            select: {
              comments: true,
              reactions: {
                where: {
                  type: "LIKE",
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          subscribers: true,
        },
      },
    },
  })
  const view = await prisma.video.aggregate({
    where: {
      channelId: channel?.id,
    },
    _sum: {
      views: true,
    },
  })
  let lastVideo = null
  if (channel?.videos[0]) {
    lastVideo = {
      id: channel?.videos[0]?.id,
      comments: channel?.videos[0]._count.comments,
      likes: channel?.videos[0]._count.reactions,
      views: channel?.videos[0].views,
    }
  }
  const data = {
    ...channel,
    subscribers: channel?._count.subscribers,
    views: view._sum.views ?? 0,
    lastVideo,
  }
  delete data._count
  delete data.videos
  res.status(200).json(data)
}

export const subscribeToChannel = async (req: Request, res: Response) => {
  const channel = req.channel as Channel
  const { id } = req.body
  const subscriberId = channel.id as number
  const subscribe = await prisma.subscription.create({
    data: { subscriberId, channelId: id },
  })
  res.status(201).json(subscribe)
}

export const unsubscribeChannel = async (req: Request, res: Response) => {
  const channel = req.channel as Channel
  const { id } = req.params
  const subscriberId = channel.id as number
  const subscribe = await prisma.subscription.delete({
    where: { subscriberId_channelId: { subscriberId, channelId: Number(id) } },
  })
  res.status(201).json(subscribe)
}

export const getSubscriptionStatus = async (req: Request, res: Response) => {
  const channel = req.channel as Channel
  const { id } = req.params
  const subscriberId = channel.id as number
  const subscribe = await prisma.subscription.findFirst({
    where: { subscriberId, channelId: Number(id) },
  })
  res.status(201).json({ isSubscribed: !!subscribe })
}
