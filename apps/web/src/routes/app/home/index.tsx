import { Link } from "react-router"
import VideoCard from "@/routes/app/components/video-card"
import type { VideoWithChannel } from "@/types/video"
import { useRecommendedVideos } from "@/hooks/useRecommendedVideos"

const Home = () => {
  const { data: videos, isLoading } = useRecommendedVideos()
  console.log(videos)
  if (isLoading) return "Loading..."
  if (!Array.isArray(videos)) return "No videos"
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {videos?.map((video: VideoWithChannel) => (
        <Link key={video.id} to={`/watch?v=${video.id}`}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  )
}

export default Home
