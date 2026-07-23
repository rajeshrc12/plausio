import { env } from "@/config/env"
import type { ChannelWithVideos } from "@/types/combine"
import type { Subscription } from "@/types/schema"
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
  const { data } = await api.get<ChannelWithVideos>("/me")
  return data
}
export const getChannel = async (handle: string) => {
  const { data } = await api.get<ChannelWithVideos>(`/public/${handle}`)
  return data
}
export const handleSubscription = async ({
  isSubscribed,
  id,
}: {
  isSubscribed: boolean
  id: number
}) => {
  let response
  if (isSubscribed)
    response = await api.delete<Subscription>(`/subscription/${id}`)
  else
    response = await api.post<Subscription>(`/subscription`, {
      id,
    })
  return response.data
}

export const getSubscriptionStatus = async (id: number) => {
  const { data } = await api.get<{ isSubscribed: boolean }>(
    `/subscription/${id}`
  )
  return data
}
