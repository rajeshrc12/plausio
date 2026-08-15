import { env } from "@/config/env"
import type { AddMovie, Movie } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.UPLOAD_API_URL}/movie`,
  withCredentials: true, // important to send cookies
})

export const addMovie = async (movie: AddMovie) => {
  const response = await api.post<Movie>("/", movie)
  return response.data
}
