import { addVideo, addVideoReaction } from "@/api/video"
import { videoKeys } from "@/queryKeys/video"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useAddVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addVideo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: videoKeys.me(),
      })
    },
  })
}

export function useAddVideoReaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addVideoReaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: videoKeys.all,
      })
    },
  })
}
