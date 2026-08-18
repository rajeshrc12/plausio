export const MAX_THUMBNAIL_SIZE = 1 * 1024 * 1024
export const MAX_VIDEO_SIZE = 1024 * 1024 * 1024

export const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]
export const VIDEO_TYPES = ["mp4", "mkv"]

export const FileStatus = {
  INIT: "INIT",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const

export const genre = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
] as const
