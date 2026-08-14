import { z } from "zod"
import {
  IMAGE_TYPES,
  MAX_THUMBNAIL_SIZE,
  MAX_VIDEO_SIZE,
  VIDEO_TYPES,
} from "@/types/constant"

/* ============================
 * User
 * ============================ */

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserSchema = z.infer<typeof UserSchema>

export const movieFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),

  thumbnail: z
    .instanceof(File, { message: "Thumbnail is required" })
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: "Thumbnail must be a JPG, JPEG, or PNG image",
    })
    .refine((file) => file.size <= MAX_THUMBNAIL_SIZE, {
      message: "Thumbnail must be less than 1 MB",
    }),

  movie: z
    .instanceof(File, { message: "Movie is required" })
    .refine(
      (file) => {
        const ext = file.name.split(".").pop()?.toLowerCase()
        return VIDEO_TYPES.includes(ext ?? "")
      },
      {
        message: "Movie must be an MP4 or MKV file",
      }
    )
    .refine((file) => file.size <= MAX_VIDEO_SIZE, {
      message: "Movie must be less than 50 MB",
    }),
})

export type movieFormSchema = z.infer<typeof movieFormSchema>
