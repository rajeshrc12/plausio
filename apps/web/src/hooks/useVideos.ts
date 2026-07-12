import channel from "@/api/channel"
import { useQuery } from "@tanstack/react-query"

const getVideos = async () => {
  const res = await channel.get("/video")
  return res.data
}

export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
