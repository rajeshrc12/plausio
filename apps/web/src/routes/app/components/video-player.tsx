import { useRef } from "react"
import { updateView } from "@/api/video"
import { getVideoUrl } from "@/utils/video"

const VideoPlayer = ({ id }: { id: number }) => {
  const hasCountedView = useRef(false)

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (hasCountedView.current) return

    const video = e.currentTarget

    if (video.currentTime >= 10) {
      hasCountedView.current = true

      void updateView(id).catch((error) => {
        console.error(error)
        hasCountedView.current = false
      })
    }
  }

  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      playsInline
      controls
      src={getVideoUrl(id)}
      onTimeUpdate={handleTimeUpdate}
    />
  )
}

export default VideoPlayer
