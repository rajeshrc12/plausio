import VideoPlayer from "@/routes/app/components/video-player"

const Video = () => {
  return (
    <div className="flex flex-col">
      <div className="h-screen w-full">
        <VideoPlayer src="http://localhost:3000/s3/video/1/hls/master.m3u8" />
      </div>
    </div>
  )
}

export default Video
