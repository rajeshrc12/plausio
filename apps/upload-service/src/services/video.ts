import { getThumbnailKey, getVideoKey } from "@/utils/s3"
import {
  createMultipartUploadId,
  createMultipartUploadUrls,
} from "@/services/s3"
import { env } from "@/config/env"

export const uploadFiles = async ({
  videoId,
  videoType,
  videoSize,
  thumbnailType,
}: {
  videoId: string
  videoType: string
  videoSize: number
  thumbnailType: string
}) => {
  const videoKey = getVideoKey({ id: videoId })
  const thumbnailKey = getThumbnailKey({
    id: videoId,
  })

  const videoUploadId = await createMultipartUploadId({
    key: videoKey,
    contentType: videoType,
  })
  const thumbnailUploadId = await createMultipartUploadId({
    key: thumbnailKey,
    contentType: thumbnailType,
  })
  if (!videoUploadId) {
    throw new Error("videoUploadId not returned from S3")
  }
  if (!thumbnailUploadId) {
    throw new Error("thumbnailUploadId not returned from S3")
  }
  const totalParts = Math.ceil(videoSize / env.AWS_S3_PART_SIZE_IN_MB)

  const videoUrls = await createMultipartUploadUrls({
    totalParts,
    key: videoKey,
    uploadId: videoUploadId,
  })

  const [thumbnailUrl] = await createMultipartUploadUrls({
    key: thumbnailKey,
    uploadId: thumbnailUploadId,
  })

  return {
    videoUrls,
    thumbnailUrl,
    videoKey,
    thumbnailKey,
    videoUploadId,
    thumbnailUploadId,
  }
}
