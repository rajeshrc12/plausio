import { env } from "@/config/env"
import type { AddChat, Chat } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.USER_API_URL}/chat`,
  withCredentials: true, // important to send cookies
})

export const createChat = async (data: AddChat) => {
  const chat = await api.post<Chat>("/", data)
  return chat.data
}
export const getChats = async () => {
  const chat = await api.get<Chat[]>("/")
  return chat.data
}
