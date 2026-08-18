import { getMovie, getMovies } from "@/api/public"
import { publicKeys } from "@/queryKeys/public"
import { useQuery } from "@tanstack/react-query"

export function useMovies() {
  return useQuery({
    queryKey: publicKeys.movies(),
    queryFn: getMovies,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}

export function useMovie(id: number) {
  return useQuery({
    queryKey: publicKeys.detail(id),
    queryFn: () => getMovie(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
