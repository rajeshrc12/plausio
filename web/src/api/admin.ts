import { env } from "@/config/env"
import type { AddAdmin, Admin } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.UPLOAD_API_URL}/admin`,
  withCredentials: true, // important to send cookies
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    if (error.response?.status === 401) {
      if (window.location.pathname.startsWith("/dashboard")) {
        window.location.href = "/admin-login"
      }

      return Promise.resolve(null)
    }
  }
)

export const getMe = async () => {
  const me = await api.get<Admin>("/me")
  return me.data
}

export const login = async ({ userName, password }: AddAdmin) => {
  try {
    const me = await api.post("/login", { userName, password })
    return me.data
  } catch (e) {
    console.log(e)
    return null
  }
}
