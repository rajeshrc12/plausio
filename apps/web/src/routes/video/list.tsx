import { useVideos } from "@/hooks/getVideos"
import VideoCard from "@/routes/video/card"
import type { Video as VideoModel } from "@workspace/db"

const VideoList = () => {
  const { data } = useVideos()
  console.log(data)
  return (
    <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {data?.map((video: VideoModel) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  )
}

export default VideoList
