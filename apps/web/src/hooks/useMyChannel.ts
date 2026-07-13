import channel from "@/api/channel"
import { useQuery } from "@tanstack/react-query"

const getMyChannel = async () => {
  const res = await channel.get(`/channel/me`)
  return res.data
}

export const useMyChannel = () => {
  return useQuery({
    queryKey: ["mychannel"],
    queryFn: getMyChannel,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
