import channel from "@/api/channel"
import { useQuery } from "@tanstack/react-query"

const getRecommendedVideos = async () => {
  const res = await channel.get("/video/recommend")
  return res.data
}

export const useRecommendedVideos = () => {
  return useQuery({
    queryKey: ["recommend"],
    queryFn: getRecommendedVideos,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
