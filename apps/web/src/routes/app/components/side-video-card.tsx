import { Play } from "lucide-react"

interface Video {
  id: number
  title: string
  duration: string
  views: string
  channelName: string
  createdAt: string
  thumbnail: string
}
interface SideVideoProps {
  video: Video
}
const SideVideoCard = ({ video }: SideVideoProps) => {
  return (
    <div key={video.id} className="grid grid-cols-12 gap-3">
      <div className="relative col-span-6">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-30 w-full rounded-md object-cover"
        />

        <span className="absolute right-1 bottom-1 rounded bg-primary/90 px-1.5 py-0.5 text-xs font-medium text-background">
          {video.duration}
        </span>
      </div>

      <div className="col-span-6 flex flex-col gap-1">
        <h3 className="line-clamp-2 text-sm leading-5 font-semibold">
          {video.title}
        </h3>

        <p className="text-xs text-muted-foreground">{video.channelName}</p>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Play size={10} /> {video.views} views • {video.createdAt}
        </p>
      </div>
    </div>
  )
}

export default SideVideoCard
