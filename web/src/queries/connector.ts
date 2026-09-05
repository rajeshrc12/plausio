import { getConnectors } from "@/api/connector"
import { connectorKeys } from "@/queryKeys/connector"
import { useQuery } from "@tanstack/react-query"

export function useConnector() {
  return useQuery({
    queryKey: connectorKeys.all,
    queryFn: getConnectors,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
