import { usePublicVideos } from "@/queries/video"
import VideoCard from "@/routes/app/components/video-card"
import type { VideoWithChannel } from "@/types/video"

const Home = () => {
  const { data: publicVideos, isLoading } = usePublicVideos()
  if (isLoading) return "Loading..."
  if (!Array.isArray(publicVideos)) return "No videos"
  return (
    <div className="grid grid-cols-3 p-2">
      {publicVideos?.map((video: VideoWithChannel) => (
        <VideoCard video={video} />
      ))}
    </div>
  )
}

export default Home
