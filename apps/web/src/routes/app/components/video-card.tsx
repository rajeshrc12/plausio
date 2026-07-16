import { Play } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { getVideoCreationDate } from "@/utils/date"
import type { VideoWithChannel } from "@/types/video"
import {
  formatVideoDuration,
  getProfileUrl,
  getThumbnailUrl,
} from "@/utils/video"

const VideoCard = ({ video }: { video: VideoWithChannel }) => {
  return (
    <div>
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={getThumbnailUrl(video.id)}
          alt={video.title}
          className="aspect-video w-full object-cover"
        />

        <span className="absolute right-2 bottom-2 rounded bg-primary/90 px-1.5 py-0.5 text-xs font-medium text-background">
          {formatVideoDuration(video.duration)}
        </span>
      </div>

      {/* Video Details */}
      <div className="mt-3 flex gap-3">
        {/* Channel Avatar */}
        {video.channel && (
          <Avatar className={"h-10 w-10"}>
            <AvatarImage src={getProfileUrl(video?.channel?.id)} />
            <AvatarFallback>{video.channel.name[0]}</AvatarFallback>
          </Avatar>
        )}

        <div className="flex flex-1 flex-col gap-1">
          <h3 className="line-clamp-2 leading-5 font-semibold break-all">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div>{video?.channel?.name}</div>
            <Play size={10} />
            <div>{video.views}</div>
            <div>{getVideoCreationDate(video.createdAt)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
