import { env } from "@/config/env"

interface File {
  id: string
}

export const getVideoKey = ({ id }: File) => {
  return `${env.AWS_S3_BUCKET_VIDEO_PATH}/${id}/original`
}

export const getThumbnailKey = ({ id }: File) => {
  return `${env.AWS_S3_BUCKET_THUMBNAIL_PATH}/${id}/original`
}
