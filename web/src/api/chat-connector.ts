import { env } from "@/config/env"
import type { ChatConnector } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.USER_API_URL}/chat-connector`,
  withCredentials: true, // important to send cookies
})

export const getChatConnectors = async (id: number) => {
  const chat = await api.get<ChatConnector[]>(`/${id}`)
  return chat.data
}
