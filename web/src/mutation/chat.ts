import { createChat } from "@/api/chat"
import { chatKeys } from "@/queryKeys/chat"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createChat,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.all,
      })
    },
  })
}
