import { usePublicVideos } from "@/queries/video"
import HomeSkeleton from "@/routes/app/components/skeleton/home"
import VideoCard from "@/routes/app/components/video-card"
const Home = () => {
  const { data: publicVideos } = usePublicVideos()
  if (Array.isArray(publicVideos) && publicVideos.length > 0)
    return (
      <div className="grid grid-cols-3 p-2">
        {publicVideos?.map((video) => (
          <VideoCard key={video.id} video={video} channel={video.channel} />
        ))}
      </div>
    )
  return <HomeSkeleton />
}

export default Home
