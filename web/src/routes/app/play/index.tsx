import { useMe } from "@/queries/user"
import VideoPlayer from "@/routes/app/components/video-player"
import { getVideoUrl } from "@/utils/movie"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"

const Video = () => {
  const { isLoading, isError } = useMe()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (isError || !id) {
      navigate("/", { replace: true })
    }
  }, [isError, id, navigate])

  if (isLoading) {
    return null // or <Loading />
  }

  if (isError || !id) {
    return null
  }
  if (id)
    return (
      <div className="h-dvh w-full overflow-hidden">
        <VideoPlayer src={getVideoUrl(Number(id))} />
      </div>
    )
}

export default Video
