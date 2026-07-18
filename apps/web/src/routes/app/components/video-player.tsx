import { useRef } from "react"
import { updateView } from "@/api/video"

const VideoPlayer = ({ id }: { id: number }) => {
  const hasCountedView = useRef(false)

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (hasCountedView.current) return

    const video = e.currentTarget

    if (video.currentTime >= 3) {
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
      controls
      src="https://samplelib.com/mp4/sample-5s-360p.mp4"
      onTimeUpdate={handleTimeUpdate}
    />
  )
}

export default VideoPlayer
