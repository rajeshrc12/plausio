import VideoPlayer from "@/routes/app/components/video-player"
import { getVideoUrl } from "@/utils/movie"
import { useParams } from "react-router"

const Video = () => {
  const { id } = useParams()
  if (id)
    return (
      <div className="flex flex-col">
        <div className="h-screen w-full">
          <VideoPlayer src={getVideoUrl(Number(id))} />
        </div>
      </div>
    )
}

export default Video
