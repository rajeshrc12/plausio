import { getDashboard, getMe } from "@/api/admin"
import { adminKeys } from "@/queryKeys/admin"
import { useQuery } from "@tanstack/react-query"

export function useMe() {
  return useQuery({
    queryKey: adminKeys.me(),
    queryFn: getMe,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}

export function useDashboard() {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: getDashboard,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
