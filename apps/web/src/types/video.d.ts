import type { Video, Channel, Comment, Subscription } from "@workspace/db"
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
export type SubscriptionWithChannel = Subscription & {
  channel: Channel
}
export type ChannelWithVideos = Channel & {
  subscribers: number
  views: number
  videos: Video[]
  subscriptions: SubscriptionWithChannel[]
}

export type CommentWithChannel = Comment & {
  channel: Channel
}
