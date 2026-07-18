import { Forward } from "lucide-react"
import Subscribe from "@/routes/app/components/subscribe"
import Reaction from "@/routes/app/components/reaction"
import VideoDescription from "@/routes/app/components/video-description"
import type { Channel, Video } from "@workspace/db"
import ChannelCard from "@/routes/app/components/channel-card"
import { useMyChannel } from "@/queries/channel"

const VideoDetail = ({
  video,
  channel,
}: {
  video: Video
  channel: Channel
}) => {
  const { data: myChannel } = useMyChannel()
  if (!video) return
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl font-bold">{video?.title}</div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <ChannelCard channel={channel} />
          {myChannel?.id !== channel.id && <Subscribe id={channel.id} />}
        </div>
        <div className="flex gap-3">
          <Reaction id={video.id} />
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
