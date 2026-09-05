import { env } from "@/config/env"
import type { User } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.USER_API_URL}/user`,
  withCredentials: true, // important to send cookies
})

export const getMe = async () => {
  const me = await api.get<User>("/me")
  return me.data
}
