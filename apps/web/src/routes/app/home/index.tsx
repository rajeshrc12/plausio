import { usePublicVideos } from "@/queries/video"
import VideoCard from "@/routes/app/components/video-card"
const Home = () => {
  const { data: publicVideos, isLoading } = usePublicVideos()
  if (isLoading) return "Loading..."
  if (!Array.isArray(publicVideos)) return "No videos"
  return (
    <div className="grid grid-cols-3 p-2">
      {publicVideos?.map((video) => (
        <VideoCard key={video.id} video={video} channel={video.channel} />
      ))}
    </div>
  )
}

export default Home
