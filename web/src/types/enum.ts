import { z } from "zod"

/* ============================
 * Enums
 * ============================ */

export const VideoVisibilitySchema = z.enum(["PUBLIC", "PRIVATE"])
export type VideoVisibility = z.infer<typeof VideoVisibilitySchema>

export const VideoStatusSchema = z.enum([
  "INIT",
  "PROCESSING",
  "UPLOADED",
  "FAILED",
])
export type VideoStatus = z.infer<typeof VideoStatusSchema>

export const VideoReactionSchema = z.enum(["LIKE", "DISLIKE"])
export type VideoReaction = z.infer<typeof VideoReactionSchema>
