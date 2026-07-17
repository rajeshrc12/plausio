import {
  getMyReaction,
  getMyVideos,
  getPublicVideo,
  getPublicVideos,
  getVideoReaction,
} from "@/api/video"
import { videoKeys } from "@/queryKeys/video"
import { useQuery } from "@tanstack/react-query"

export function useMyVideos() {
  return useQuery({
    queryKey: videoKeys.me(),
    queryFn: getMyVideos,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
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

export function usePublicVideo(id: string) {
  return useQuery({
    queryKey: videoKeys.detail(id),
    queryFn: () => getPublicVideo(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}

export function useVideoReaction(id: number) {
  return useQuery({
    queryKey: videoKeys.reaction(id),
    queryFn: () => getVideoReaction(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
export function useMyReaction(id: number) {
  return useQuery({
    queryKey: videoKeys.myReaction(id),
    queryFn: () => getMyReaction(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
