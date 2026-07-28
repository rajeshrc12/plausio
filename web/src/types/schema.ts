import {
  VideoReactionSchema,
  VideoStatusSchema,
  VideoVisibilitySchema,
} from "@/types/enum"
import { z } from "zod"
import {
  IMAGE_TYPES,
  MAX_THUMBNAIL_SIZE,
  MAX_VIDEO_SIZE,
  VIDEO_TYPES,
} from "@/types/constant"

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

export const uploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),

  thumbnail: z
    .instanceof(File, { message: "Thumbnail is required" })
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: "Thumbnail must be a JPG, JPEG, or PNG image",
    })
    .refine((file) => file.size <= MAX_THUMBNAIL_SIZE, {
      message: "Thumbnail must be less than 1 MB",
    }),

  video: z
    .instanceof(File, { message: "Video is required" })
    .refine(
      (file) => {
        const ext = file.name.split(".").pop()?.toLowerCase()
        return VIDEO_TYPES.includes(ext ?? "")
      },
      {
        message: "Video must be an MP4 or MKV file",
      }
    )
    .refine((file) => file.size <= MAX_VIDEO_SIZE, {
      message: "Video must be less than 50 MB",
    }),
})

export type UploadValues = z.infer<typeof uploadSchema>
