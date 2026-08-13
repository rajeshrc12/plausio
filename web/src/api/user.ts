import { env } from "@/config/env"
import type { UserSchema } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.UPLOAD_API_URL}/user`,
  withCredentials: true, // important to send cookies
})

export const getMe = async () => {
  const me = await api.get<UserSchema>("/me")
  return me.data
}
