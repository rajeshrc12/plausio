import { getVideoCreationDate } from "@/utils/date"
import { formatVideoDuration, getThumbnailUrl } from "@/utils/video"
import type { Channel, Video } from "@workspace/db"
import { Play } from "lucide-react"
import { Link } from "react-router"

const SideVideoCard = ({
  video,
  channel,
}: {
  video: Video
  channel: Channel
}) => {
  return (
    <Link to={`/watch?v=${video.id}`}>
      <div key={video.id} className="grid grid-cols-12 gap-3">
        <div className="relative col-span-6">
          <img
            src={getThumbnailUrl(video.id)}
            alt={video.title}
            className="h-30 w-full rounded-md object-cover"
          />

          <span className="absolute right-1 bottom-1 rounded bg-primary/90 px-1.5 py-0.5 text-xs font-medium text-background">
            {formatVideoDuration(video.duration)}
          </span>
        </div>

        <div className="col-span-6 flex flex-col gap-1">
          <h3 className="line-clamp-2 text-sm leading-5 font-semibold">
            {video.title}
          </h3>

          <p className="text-xs text-muted-foreground">{channel.name}</p>

          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Play size={10} /> {video.views} views •{" "}
            {getVideoCreationDate(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default SideVideoCard
