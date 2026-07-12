import { useRecommendedVideos } from "@/hooks/useRecommendedVideos"
import SideVideoCard from "@/routes/app/components/side-video-card"
import type { VideoWithChannel } from "@/types/video"

const SideVideoRecommendation = () => {
  const { data: videos, isLoading } = useRecommendedVideos()
  if (isLoading) return "Loading..."
  return videos?.map((video: VideoWithChannel) => (
    <SideVideoCard key={video.id} video={video} />
  ))
}

export default SideVideoRecommendation
