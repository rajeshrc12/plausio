import {
  ThumbnailSchema,
  VideoSchema,
  type Channel,
  type Comment,
  type Subscription,
  type Video,
} from "@/types/schema"

import { z } from "zod"

export const AddVideoDataSchema = VideoSchema.pick({
  name: true,
  type: true,
  size: true,
  visibility: true,
  title: true,
  description: true,
  duration: true,
})

export type AddVideoData = z.infer<typeof AddVideoDataSchema>

export const AddThumbnailDataSchema = ThumbnailSchema.pick({
  name: true,
  type: true,
  size: true,
})

export type AddThumbnailData = z.infer<typeof AddThumbnailDataSchema>

export const AddVideoDtoSchema = z.object({
  videoFile: z.instanceof(File),
  thumbnailFile: z.instanceof(File),
  videoData: AddVideoDataSchema,
  thumbnailData: AddThumbnailDataSchema,
})

export type AddVideoDto = z.infer<typeof AddVideoDtoSchema>

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
  lastVideo: { id: number; comments: number; likes: number; views: number }
}

export type CommentWithChannel = Comment & {
  channel: Channel
}
