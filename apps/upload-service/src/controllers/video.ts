import { Request, Response } from "express"
import { Channel, prisma } from "@workspace/db"
import { uploadFiles } from "@/services/video"
import { env } from "@/config/env"
import { completeMultipartUpload } from "@/services/s3"
import { createVideoJob } from "@/services/rabbitmq"

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

    res.status(200).json({
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
        status: "uploaded",
      },
    })
    if (video) createVideoJob({ id: video.id, type: video.type })
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
    const channel = req.channel as Channel
    const myChannelId = channel?.id

    const video = await prisma.video.update({
      where: {
        id: Number(id),
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        channel: true,
        comments: {
          include: {
            channel: true,
          },
        },
      },
    })

    const videoChannelId = video.channel.id
    const subscribe = await prisma.subscription.findFirst({
      where: {
        subscriberId: myChannelId,
        channelId: videoChannelId,
      },
    })
    const videoReaction = await prisma.videoReaction.findFirst({
      where: {
        videoId: Number(id),
        channelId: myChannelId,
      },
    })
    const reactionCounts = await prisma.videoReaction.groupBy({
      by: ["type"],
      where: {
        videoId: Number(id),
      },
      _count: {
        _all: true,
      },
    })

    const reactions = {
      like: 0,
      dislike: 0,
    }

    for (const reaction of reactionCounts) {
      reactions[reaction.type.toLowerCase() as "like" | "dislike"] =
        reaction._count._all
    }
    res.status(200).json({
      ...video,
      likes: reactions.like,
      dislikes: reactions.dislike,
      isSubscribed: !!subscribe,
      reaction: videoReaction,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to fetch video",
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

export const addComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content, videoId } = req.body
    const channel = req.channel as Channel

    const comment = await prisma.comment.create({
      data: { content, videoId, channelId: channel.id },
    })

    res.status(200).json(comment)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to fetch videos",
    })
  }
}

export const updateReaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type, videoId } = req.body
    const channel = req.channel as Channel
    let reaction
    if (type === "like" || type === "dislike") {
      reaction = await prisma.videoReaction.upsert({
        where: {
          videoId_channelId: {
            videoId,
            channelId: channel.id,
          },
        },
        update: {
          type,
        },
        create: {
          videoId,
          channelId: channel.id,
          type,
        },
      })
    }
    if (type === "remove") {
      reaction = await prisma.videoReaction.delete({
        where: {
          videoId_channelId: {
            videoId,
            channelId: channel.id,
          },
        },
      })
    }
    res.status(200).json(reaction)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Failed to fetch videos",
    })
  }
}
