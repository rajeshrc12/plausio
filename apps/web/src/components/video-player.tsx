import "@videojs/react/video/skin.css"
import { createPlayer, videoFeatures } from "@videojs/react"
import { VideoSkin, Video } from "@videojs/react/video"

const Player = createPlayer({ features: videoFeatures })

interface MyPlayerProps {
  src: string
}

const VideoPlayer = ({ src }: MyPlayerProps) => {
  return (
    <Player.Provider>
      <VideoSkin>
        <Video src={src} playsInline />
      </VideoSkin>
    </Player.Provider>
  )
}
export default VideoPlayer
