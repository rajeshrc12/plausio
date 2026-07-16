import { getMyVideos, getPublicVideos } from "@/api/video"
import { videoKeys } from "@/queryKeys/video"
import { useQuery } from "@tanstack/react-query"

export function useMyVideos() {
  return useQuery({
    queryKey: videoKeys.me(),
    queryFn: getMyVideos,
  })
}

export function usePublicVideos() {
  return useQuery({
    queryKey: videoKeys.all,
    queryFn: getPublicVideos,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
