import { useParams, useSearchParams } from "react-router"
import View from "@/routes/app/video/view"
import Channel from "../channel"

const Video = () => {
  const { name } = useParams()
  const [searchParams] = useSearchParams()
  const videoId = searchParams.get("v")
  if (videoId) return <View id={videoId} />
  if (name) return <Channel name={name} />
  return "Not found"
}

export default Video
