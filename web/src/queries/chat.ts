import { getChats } from "@/api/chat"
import { chatKeys } from "@/queryKeys/chat"
import { useQuery } from "@tanstack/react-query"

export function useChats() {
  return useQuery({
    queryKey: chatKeys.all,
    queryFn: getChats,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
