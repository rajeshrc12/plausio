import { getChannel, getMyChannel, getSubscriptionStatus } from "@/api/channel"
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
    enabled: !!handle,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}

export function useSubscriptionStatus(id: number) {
  return useQuery({
    queryKey: channelKeys.subscriptionStatus(id),
    queryFn: () => getSubscriptionStatus(id),
    enabled: !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
