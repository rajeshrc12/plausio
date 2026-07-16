import { env } from "@/config/env"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.UPLOAD_API_URL}/auth`,
  withCredentials: true, // important to send cookies
})

export const signIn = async () => {
  window.location.href = `${env.UPLOAD_API_URL}/auth/google`
}

export const signOut = async () => {
  await api.post(
    "/logout",
    {},
    {
      withCredentials: true,
    }
  )
  window.location.href = `/`
}
