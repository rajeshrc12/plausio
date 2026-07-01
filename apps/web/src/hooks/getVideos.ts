import videoApi from "@/api/video"
import { useQuery } from "@tanstack/react-query"

const getVideos = async () => {
  const res = await videoApi.get("/video")
  return res.data
}

export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
    refetchOnReconnect: false,
    retry: false,
  })
}
