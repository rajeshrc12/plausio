import { env } from "@/config/env"
import type { Movie } from "@/types/schema"
import axios from "axios"

const api = axios.create({
  baseURL: `${env.UPLOAD_API_URL}/public`,
  withCredentials: true, // important to send cookies
})

export const getMovies = async (filters: string[]) => {
  const movies = await api.get<Movie[]>("/movie", {
    params: {
      genre: filters,
    },
    paramsSerializer: {
      indexes: null,
    },
  })
  return movies.data
}

export const getMovie = async (id: number) => {
  const movie = await api.get<Movie>(`/movie/${id}`)
  return movie.data
}
