import { getMessages } from "@/api/message"
import { messageKeys } from "@/queryKeys/message"
import { useQuery } from "@tanstack/react-query"

export function useMessages(id: number) {
  return useQuery({
    queryKey: messageKeys.messages(id),
    queryFn: () => getMessages(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
