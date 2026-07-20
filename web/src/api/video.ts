import { env } from "@/config/env"
import { uploadMultipartFile, uploadSingleFile } from "@/services/video"
import type { AddVideoDto, VideoWithChannel } from "@/types/combine"
import type { Reaction } from "@/types/schema"
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
  const { data } = await api.get<VideoWithChannel[]>("/me")
  return data
}

export const getPublicVideos = async () => {
  const { data } = await api.get<VideoWithChannel[]>("/public")
  return data
}
export const getPublicVideo = async (id: number) => {
  const { data } = await api.get<VideoWithChannel>(`/public/${id}`)
  return data
}
export const updateView = async (id: number) => {
  const { data } = await api.post(`/public`, { id })
  return data
}
export const addVideoReaction = async ({
  type,
  id,
}: {
  type: string
  id: number
}) => {
  const { data } = await api.post<Reaction>(`/reaction`, { type, id })
  return data
}

export const getVideoReaction = async (id: number) => {
  const { data } = await api.get<{ likes: number; dislikes: number }>(
    `/public/reaction/${id}`
  )
  return data
}

export const getMyReaction = async (id: number) => {
  const { data } = await api.get<{ type: string }>(`/reaction/${id}`)
  return data
}

export const addComment = async ({
  id,
  content,
}: {
  id: number
  content: string
}) => {
  const { data } = await api.post<Comment>(`/comment`, { videoId: id, content })
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
