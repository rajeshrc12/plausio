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

type VideoCardProps = {
  video: Video
}

const VideoCard = ({ video }: VideoCardProps) => {
  const navigate = useNavigate()
  return (
    <div
      className="cursor-pointer rounded-xl p-2 hover:bg-gray-50"
      onClick={() => navigate(`/${video.id}`)}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full rounded-xl"
      />

      <div className="mt-3 flex gap-3">
        <img
          src={video.channelImage}
          alt={video.channel}
          className="h-10 w-10 rounded-full"
        />

        <div>
          <h3 className="line-clamp-2 font-semibold">{video.title}</h3>
          <p className="text-sm text-gray-600">{video.channel}</p>
          <p className="text-sm text-gray-600">
            {video.views} views • {video.uploaded}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
