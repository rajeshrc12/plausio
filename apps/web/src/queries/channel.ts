import { getMyChannel } from "@/api/channel"
import { channelKeys } from "@/queryKeys/channel"
import { useQuery } from "@tanstack/react-query"

export function useMyChannel() {
  return useQuery({
    queryKey: channelKeys.me(),
    queryFn: getMyChannel,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
