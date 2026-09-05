import { env } from "@/config/env"
import type { AddConnector, Connector } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.USER_API_URL}/connector`,
  withCredentials: true, // important to send cookies
})

export const addConnector = async (data: AddConnector) => {
  const connector = await api.post<Connector & { url: string; key: string }>(
    "/",
    data
  )
  return connector.data
}
export const getConnectors = async () => {
  const connector = await api.get<Connector[]>("/")
  return connector.data
}
