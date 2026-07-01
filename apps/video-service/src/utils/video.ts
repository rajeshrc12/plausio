import { env } from "@/config/env"

interface VideoKey {
  videoId: string
  fileName: string
}

export const getVideoKey = ({ videoId, fileName }: VideoKey) => {
  return `${env.AWS_S3_BUCKET_VIDEO_PATH}/${videoId}`
}

export const getThumbnailKey = ({ videoId, fileName }: VideoKey) => {
  return `${env.AWS_S3_BUCKET_THUMBNAIL_PATH}/${videoId}`
}
