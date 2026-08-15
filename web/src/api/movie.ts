import { env } from "@/config/env"
import type { AddMovie, Movie } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.UPLOAD_API_URL}/movie`,
  withCredentials: true, // important to send cookies
})

export const addMovie = async (movie: AddMovie) => {
  const response = await api.post("/", movie)
  return response.data
}

export const createMovieJob = async (job: { id: number; type: string }) => {
  const response = await api.post("/job", job)
  return response.data
}

export const getMovies = async () => {
  const me = await api.get<Movie[]>("/")
  return me.data
}
