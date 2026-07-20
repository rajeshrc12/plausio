import { handleSubscription } from "@/api/channel"
import { channelKeys } from "@/queryKeys/channel"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useHandleSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: handleSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: channelKeys.all,
      })
    },
  })
}
