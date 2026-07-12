import channel from "@/api/channel"
import { useQuery } from "@tanstack/react-query"

const getChannel = async () => {
  const res = await channel.get("/channel")
  return res.data
}

export const useChannel = () => {
  return useQuery({
    queryKey: ["channel"],
    queryFn: getChannel,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
