import "@videojs/react/video/skin.css"
import { createPlayer, videoFeatures } from "@videojs/react"
import { VideoSkin, Video } from "@videojs/react/video"
import { env } from "@/config/env"

const Player = createPlayer({ features: videoFeatures })

interface MyPlayerProps {
  id: string
}

const VideoPlayer = ({ id }: MyPlayerProps) => {
  return (
    <Player.Provider>
      <VideoSkin>
        <Video
          src={`${env.VIDEO_CDN_URL}/videos/${id}/hls/index.m3u8`}
          autoPlay
        />
      </VideoSkin>
    </Player.Provider>
  )
}
export default VideoPlayer
