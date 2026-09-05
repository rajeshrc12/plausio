import { env } from "@/config/env"
import type { Celery } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.USER_API_URL}/celery`,
  withCredentials: true,
})

export const createJob = async (data: Celery) => {
  const job = await api.post<Celery>("/", data)
  return job.data
}
