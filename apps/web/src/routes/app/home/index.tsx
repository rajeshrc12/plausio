import { usePublicVideos } from "@/queries/video"
import VideoCard from "@/routes/app/components/video-card"
import type { VideoWithChannel } from "@/types/video"
import { Link } from "react-router"

const Home = () => {
  const { data: publicVideos, isLoading } = usePublicVideos()
  if (isLoading) return "Loading..."
  if (!Array.isArray(publicVideos)) return "No videos"
  return (
    <div className="grid grid-cols-3 p-2">
      {publicVideos?.map((video: VideoWithChannel) => (
        <Link
          key={video.id}
          to={`/watch?v=${video.id}`}
          className="rounded-xl p-3 transition-all hover:bg-accent"
        >
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  )
}

export default Home
