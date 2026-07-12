import { Play } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"

interface Video {
  id: number
  title: string
  duration: string
  views: string
  channelName?: string
  createdAt: string
  thumbnail: string
}

interface VideoCardProps {
  video: Video
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-video w-full object-cover"
        />

        <span className="absolute right-2 bottom-2 rounded bg-primary/90 px-1.5 py-0.5 text-xs font-medium text-background">
          {video.duration}
        </span>
      </div>

      {/* Video Details */}
      <div className="mt-3 flex gap-3">
        {/* Channel Avatar */}
        {video.channelName && (
          <Avatar className={"h-10 w-10"}>
            <AvatarImage src={`https://i.pravatar.cc/150?img=${video.id}`} />
            <AvatarFallback>name</AvatarFallback>
          </Avatar>
        )}

        <div className="flex flex-1 flex-col gap-1">
          <h3 className="line-clamp-2 leading-5 font-semibold">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div>{video.channelName}</div>
            <Play size={10} />
            <div>{video.views}</div>
            <div>{video.createdAt}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
