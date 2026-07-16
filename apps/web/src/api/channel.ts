import { env } from "@/config/env"
import type { Channel } from "@workspace/db"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.UPLOAD_API_URL}/channel`,
  withCredentials: true, // important to send cookies
})

// Response interceptor to handle 401 globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    if (window.location.pathname.startsWith("/studio")) {
      window.location.href = "/"
    }

    return Promise.resolve(null)
  }
)

export const getMyChannel = async () => {
  const { data } = await api.get<Channel>("/me")
  return data
}
