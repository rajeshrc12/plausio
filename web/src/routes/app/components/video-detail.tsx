import Subscribe from "@/routes/app/components/subscribe"
import Reaction from "@/routes/app/components/reaction"
import VideoDescription from "@/routes/app/components/video-description"
import type { Channel, Video } from "@/types/schema"
import ChannelCard from "@/routes/app/components/channel-card"
import { useMyChannel } from "@/queries/channel"
import Share from "@/routes/app/components/share"

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
          <Share id={video.id} />
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
