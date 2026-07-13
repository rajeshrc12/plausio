import { env } from "@/config/env"
import axios from "axios"

const channelApi = axios.create({
  baseURL: env.UPLOAD_API_URL,
  withCredentials: true, // important to send cookies
})

// Response interceptor to handle 401 globally
channelApi.interceptors.response.use(
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

export default channelApi
