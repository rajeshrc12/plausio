import { getMovies } from "@/api/public"
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
