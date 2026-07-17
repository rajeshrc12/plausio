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
  comments: Comment[]
}

export type ChannelWithVideos = Channel & {
  videos: Video[]
}
