import { usePublicVideo, usePublicVideos } from "@/queries/video"
import AddComment from "@/routes/app/components/add-comment"
import SideVideoCard from "@/routes/app/components/side-video-card"
import VideoDetail from "@/routes/app/components/video-detail"
import VideoPlayer from "@/routes/app/components/video-player"

const View = ({ videoId }: { videoId: number }) => {
  const { data: videoData } = usePublicVideo(videoId)
  const { data: videos } = usePublicVideos()
  if (!videoData || !videos) return
  return (
    <div className="grid grid-cols-12 gap-6 p-4">
      <div className="col-span-8 flex flex-col gap-6">
        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <VideoPlayer id={videoData.id} />
        </div>
        <VideoDetail video={videoData} channel={videoData.channel} />

        <AddComment id={videoData.id} comments={videoData.comments} />
      </div>
      <div className="col-span-4 flex flex-col gap-4">
        {videos?.map((video) => (
          <SideVideoCard key={video.id} video={video} channel={video.channel} />
        ))}
      </div>
    </div>
  )
}

export default View
