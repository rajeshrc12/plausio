import {
  VideoReactionSchema,
  VideoStatusSchema,
  VideoVisibilitySchema,
} from "@/types/enum"
import { z } from "zod"

/* ============================
 * Channel
 * ============================ */

export const ChannelSchema = z.object({
  id: z.number().int(),
  handle: z.string(),
  email: z.email(),
  name: z.string(),
  description: z.string(),
  country: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Channel = z.infer<typeof ChannelSchema>

/* ============================
 * Subscription
 * ============================ */

export const SubscriptionSchema = z.object({
  subscriberId: z.number().int(),
  channelId: z.number().int(),

  createdAt: z.date(),
})

export type Subscription = z.infer<typeof SubscriptionSchema>

/* ============================
 * Video
 * ============================ */

export const VideoSchema = z.object({
  id: z.number().int(),

  title: z.string(),
  description: z.string(),
  type: z.string(),

  visibility: VideoVisibilitySchema,
  status: VideoStatusSchema,

  views: z.number().int(),

  duration: z.number().int(),
  size: z.number().int(),
  name: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),

  channelId: z.number().int(),
})

export type Video = z.infer<typeof VideoSchema>

/* ============================
 * Reaction
 * ============================ */

export const ReactionSchema = z.object({
  id: z.number().int(),

  videoId: z.number().int(),
  channelId: z.number().int(),

  type: VideoReactionSchema,

  createdAt: z.date(),
})

export type Reaction = z.infer<typeof ReactionSchema>

/* ============================
 * Comment
 * ============================ */

export const CommentSchema = z.object({
  id: z.number().int(),

  content: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),

  videoId: z.number().int(),
  channelId: z.number().int(),
})

export type Comment = z.infer<typeof CommentSchema>

/* ============================
 * Thumbnail
 * ============================ */

export const ThumbnailSchema = z.object({
  id: z.number().int(),

  name: z.string(),
  size: z.number().int(),
  type: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),

  videoId: z.number().int(),
})

export type Thumbnail = z.infer<typeof ThumbnailSchema>
