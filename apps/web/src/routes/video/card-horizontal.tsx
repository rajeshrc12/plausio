import { useNavigate } from "react-router"

type Video = {
  id: number
  title: string
  thumbnail: string
  channel: string
  channelImage: string
  views: string
  uploaded: string
}

type VideoCardHorizontalProps = {
  video: Video
}

const VideoCardHorizontal = ({ video }: VideoCardHorizontalProps) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/${video.id}`)}
      className="flex cursor-pointer gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
    >
      {/* Thumbnail */}
      <div className="relative h-24 w-44 shrink-0 overflow-hidden rounded-xl bg-muted">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover"
        />

        <span className="absolute right-1 bottom-1 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
          12:34
        </span>
      </div>

      {/* Metadata */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm leading-5 font-medium">
          {video.title}
        </h3>

        <p className="mt-1 text-xs text-muted-foreground">{video.channel}</p>

        <p className="text-xs text-muted-foreground">
          {video.views} views • {video.uploaded}
        </p>
      </div>
    </div>
  )
}

export default VideoCardHorizontal
