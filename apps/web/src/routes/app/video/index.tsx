import { useParams, useSearchParams } from "react-router"
import View from "@/routes/app/video/view"
import Channel from "@/routes/app/channel"

const Video = () => {
  const { path } = useParams()
  const [searchParams] = useSearchParams()
  const videoId = searchParams.get("v")
  if (videoId) return <View videoId={videoId} />
  if (path) return <Channel handle={path} />
  return "Not found"
}

export default Video
