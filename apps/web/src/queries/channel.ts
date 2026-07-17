import { getChannel, getMyChannel } from "@/api/channel"
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

export function useChannel(handle: string) {
  return useQuery({
    queryKey: channelKeys.detail(handle),
    queryFn: () => getChannel(handle),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
