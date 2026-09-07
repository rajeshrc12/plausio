import { getChatConnectors } from "@/api/chat-connector"
import { chatConnectorKeys } from "@/queryKeys/chat-connector"
import { useQuery } from "@tanstack/react-query"

export function useChatConnectors(id: number) {
  return useQuery({
    queryKey: chatConnectorKeys.connectors(id),
    queryFn: () => getChatConnectors(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
