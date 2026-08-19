import { getMovies } from "@/api/movie"
import { movieKeys } from "@/queryKeys/movie"
import { useQuery } from "@tanstack/react-query"

export function useMovies() {
  return useQuery({
    queryKey: movieKeys.movies(),
    queryFn: getMovies,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
