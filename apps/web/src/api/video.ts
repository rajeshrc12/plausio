import { env } from "@/config/env"
import type { AddVideoDto } from "@/types/video"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.UPLOAD_API_URL}/video`,
  withCredentials: true, // important to send cookies
})

// Response interceptor to handle 401 globally
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

export const addVideo = async (video: AddVideoDto) => {
  const { data } = await api.post("/", video)
  return data
}
