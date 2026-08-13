import { getMe } from "@/api/user"
import { userKeys } from "@/queryKeys/user"
import { useQuery } from "@tanstack/react-query"

export function useMe() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getMe,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
