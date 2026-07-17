import type { Video, Channel, Comment } from "@workspace/db"
import { Prisma } from "@workspace/db"

export type AddVideoDto = {
  videoFile: File
  thumbnailFile: File
  videoData: Omit<Prisma.VideoCreateInput, "channel">
  thumbnailData: Omit<Prisma.ThumbnailCreateInput, "video">
}

export type VideoWithChannel = Video & {
  channel: Channel
  comments: CommentWithChannel[]
}

export type ChannelWithVideos = Channel & {
  subscribers: number
  views: number
  videos: Video[]
}

export type CommentWithChannel = Comment & {
  channel: Channel
}
