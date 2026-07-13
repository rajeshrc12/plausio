import channel from "@/api/channel"
import { useQuery } from "@tanstack/react-query"

const getChannel = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [, name] = queryKey
  const res = await channel.get(`/channel/${name}`)
  return res.data
}

export const useChannel = (name: string) => {
  return useQuery({
    queryKey: ["channel", name],
    queryFn: getChannel,
    enabled: !!name,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
