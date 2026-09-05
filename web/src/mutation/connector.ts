import { addConnector } from "@/api/connector"
import { connectorKeys } from "@/queryKeys/connector"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useAddConnector() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addConnector,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: connectorKeys.all,
      })
    },
  })
}
