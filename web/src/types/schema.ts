import { z } from "zod"
import {
  FileStatus,
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

export type User = z.infer<typeof UserSchema>

/* ============================
 * Admin
 * ============================ */

export const AdminSchema = z.object({
  id: z.number().int(),
  userName: z.string(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Admin = z.infer<typeof AdminSchema>

export const AddAdminSchema = AdminSchema.pick({
  userName: true,
  password: true,
})
export type AddAdmin = z.infer<typeof AddAdminSchema>

/* ============================
 * Movie
 * ============================ */

export const MovieSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),

  views: z.number().int(),
  duration: z.number().int(),

  fileStatus: z.enum(FileStatus).optional(),
  fileType: z.string(),
  fileSize: z.number().int(),
  fileName: z.string(),

  genre: z.array(z.string()),
  director: z.string(),
  starring: z.string(),
  publisher: z.string(),
  year: z.number(),

  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Movie = z.infer<typeof MovieSchema>

export const AddMovieSchema = MovieSchema.pick({
  fileName: true,
  fileType: true,
  fileSize: true,
  title: true,
  description: true,
  duration: true,
  genre: true,
  director: true,
  starring: true,
  publisher: true,
  year: true,
})
export type AddMovie = z.infer<typeof AddMovieSchema>

export const movieFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),
  starring: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),
  director: z
    .string()
    .min(1, "Director is required")
    .max(100, "Director cannot exceed 100 characters"),
  publisher: z
    .string()
    .min(1, "Publisher is required")
    .max(100, "Publisher cannot exceed 100 characters"),
  year: z
    .number()
    .min(1900, "Year should be greater than 1900")
    .max(2026, "Year cannot exceed 100 characters"),
  genre: z.array(z.string()).min(1, "Add at least one genre"),
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

export type movieForm = z.infer<typeof movieFormSchema>
