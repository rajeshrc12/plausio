import { addMovie } from "@/api/movie"
import { adminKeys } from "@/queryKeys/admin"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useAddMovie() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addMovie,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.me(),
      })
    },
  })
}
