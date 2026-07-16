import { usePublicVideo, usePublicVideos } from "@/queries/video"
import SideVideoCard from "@/routes/app/components/side-video-card"
import VideoDetail from "@/routes/app/components/video-detail"
import type { VideoWithChannel } from "@/types/video"

const View = ({ videoId }: { videoId: string }) => {
  const { data: video } = usePublicVideo(videoId)
  const { data: videos } = usePublicVideos()
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-8">
        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <video
            className="h-full w-full object-cover"
            controls
            src="https://samplelib.com/mp4/sample-5s-360p.mp4"
          />
        </div>
        <VideoDetail video={video} />
      </div>
      <div className="col-span-4 flex flex-col gap-4">
        {videos?.map((video: VideoWithChannel) => (
          <SideVideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}

export default View
