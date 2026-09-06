import { env } from "@/config/env"
import type { AddMessage, Message } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.USER_API_URL}/message`,
  withCredentials: true, // important to send cookies
})

export const createMessage = async (data: AddMessage) => {
  const chat = await api.post<Message>("/", data)
  return chat.data
}
export const getMessages = async (id: number) => {
  const chat = await api.get<Message[]>(`/${id}`)
  return chat.data
}
