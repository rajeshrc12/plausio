import type { VideoWithChannel } from "@/types/video"
import { Forward } from "lucide-react"
import Subscribe from "@/routes/app/components/subscribe"
import Reaction from "@/routes/app/components/reaction"
import VideoDescription from "@/routes/app/components/video-description"

const VideoDetail = ({ video }: { video: VideoWithChannel }) => {
  if (!video) return
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Subscribe channel={video.channel} />
        <div className="flex gap-3">
          <Reaction likes={video.likes || 0} dislikes={video.dislikes || 0} />
          <div className="flex gap-2 rounded-full bg-accent px-4 py-2">
            <button className={"flex items-center gap-2 font-medium"}>
              <Forward />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
      <VideoDescription
        views={video.views}
        createdAt={video.createdAt}
        description={video.description}
      />
    </div>
  )
}

export default VideoDetail
