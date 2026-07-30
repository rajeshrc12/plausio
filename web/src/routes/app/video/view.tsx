import { usePublicVideo, usePublicVideos } from "@/queries/video"
import AddComment from "@/routes/app/components/add-comment"
import SideVideoCard from "@/routes/app/components/side-video-card"
import ViewSkeleton from "@/routes/app/components/skeleton/view"
import VideoDetail from "@/routes/app/components/video-detail"
import VideoPlayer from "@/routes/app/components/video-player"

const View = ({ videoId }: { videoId: number }) => {
  const { data: videoData, isLoading } = usePublicVideo(videoId)
  const { data: videos } = usePublicVideos()
  if (isLoading) return <ViewSkeleton />
  if (videoData && videos?.length)
    return (
      <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-8 lg:pl-4">
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <VideoPlayer id={videoData.id} />
          </div>

          <VideoDetail video={videoData} channel={videoData.channel} />

          <AddComment id={videoData.id} comments={videoData.comments} />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          {videos.map((video) => (
            <SideVideoCard
              key={video.id}
              video={video}
              channel={video.channel}
            />
          ))}
        </div>
      </div>
    )
  if (!videoData) return "No video found"
}

export default View
