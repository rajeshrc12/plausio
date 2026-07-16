import { getMyVideos } from "@/api/video"
import { videoKeys } from "@/queryKeys/video"
import { useQuery } from "@tanstack/react-query"

export function useMyVideos() {
  return useQuery({
    queryKey: videoKeys.me(),
    queryFn: getMyVideos,
  })
}
