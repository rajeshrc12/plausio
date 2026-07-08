import { useParams } from "react-router"

const Video = () => {
  const { id } = useParams()
  return <div>Video {id}</div>
}

export default Video
