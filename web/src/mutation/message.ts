import { createMessage } from "@/api/message"
import { messageKeys } from "@/queryKeys/message"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateMessage(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: messageKeys.messages(id),
      })
    },
  })
}
