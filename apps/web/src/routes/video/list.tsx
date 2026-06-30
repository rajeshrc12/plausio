import VideoCard from "@/routes/video/card"

export type Video = {
  id: number
  title: string
  thumbnail: string
  channel: string
  channelImage: string
  views: string
  uploaded: string
}

const videos: Video[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Learn React in ${i + 1} Minutes | Complete Tutorial`,
  thumbnail: `https://picsum.photos/400/225?random=${i + 1}`,
  channel: "Code Academy",
  channelImage: `https://i.pravatar.cc/100?img=${i + 1}`,
  views: `${Math.floor(Math.random() * 900) + 100}K`,
  uploaded: `${Math.floor(Math.random() * 11) + 1} months ago`,
}))

const VideoList = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

export default VideoList
