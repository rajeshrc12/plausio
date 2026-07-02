import videoApi from "@/api/video"
import { useQuery } from "@tanstack/react-query"

const getVideo = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [, id] = queryKey
  const res = await videoApi.get(`/video/${id}`)
  return res.data
}

export const useVideo = (id: string) => {
  return useQuery({
    queryKey: ["video", id],
    queryFn: getVideo,
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
