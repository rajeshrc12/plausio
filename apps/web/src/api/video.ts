import { env } from "@/config/env"
import { uploadMultipartFile, uploadSingleFile } from "@/services/video"
import type { AddVideoDto } from "@/types/video"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.UPLOAD_API_URL}/video`,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    if (error.response?.status === 401) {
      if (window.location.pathname.startsWith("/studio")) {
        window.location.href = "/"
      }

      return Promise.resolve(null)
    }
  }
)

export const getMyVideos = async () => {
  const { data } = await api.get("/me")
  return data
}

export const getPublicVideos = async () => {
  const { data } = await api.get("/public")
  return data
}

export const addVideo = async ({
  videoFile,
  thumbnailFile,
  videoData,
  thumbnailData,
}: AddVideoDto) => {
  const { data } = await api.post("/init", {
    video: videoData,
    thumbnail: thumbnailData,
  })
  const videoParts = await uploadMultipartFile(
    videoFile,
    data.videoUrls,
    data.videoPartSize
  )

  const thumbnailPart = await uploadSingleFile(thumbnailFile, data.thumbnailUrl)

  const response = await api.post("/complete", {
    videoId: data.video.id,
    videoKey: data.videoKey,
    videoUploadId: data.videoUploadId,
    videoParts: videoParts,
    thumbnailKey: data.thumbnailKey,
    thumbnailUploadId: data.thumbnailUploadId,
    thumbnailParts: [thumbnailPart],
  })
  if (response.status === 201) return true
  return false
}
