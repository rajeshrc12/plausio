import { useSidebar } from "@/hooks/useSidebar"
import { useEffect } from "react"
import { useParams } from "react-router"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Forward, ThumbsDown, ThumbsUp } from "lucide-react"
import Description from "@/routes/app/components/description"
import AddComment from "@/routes/app/components/add-comment"
import Comments from "@/routes/app/components/comments"
import SideVideoRecommendation from "@/routes/app/components/side-video-recommendation"

const Video = () => {
  const { id } = useParams()
  const setAppSidebar = useSidebar((state) => state.setAppSidebar)

  useEffect(() => {
    setAppSidebar(false)
    return () => {
      setAppSidebar(true)
    }
  }, [])
  return (
    <div className="grid grid-cols-12 p-4">
      <div className="col-span-8 flex flex-col gap-4 p-2">
        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <video
            className="h-full w-full object-cover"
            controls
            src="https://avtshare01.rz.tu-ilmenau.de/avt-vqdb-uhd-1/test_1/segments/bigbuck_bunny_8bit_15000kbps_1080p_60.0fps_h264.mp4"
          />
        </div>
        <div className="text-xl font-bold">
          HLS Adaptive Bitrate Streaming - System Design
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Avatar className={"h-10 w-10"}>
              <AvatarImage src={`https://i.pravatar.cc/150?img=${id}`} />
              <AvatarFallback>name</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold">Rajesh Charhajari</div>
              <div className="text-xs text-muted-foreground">
                397k subscribers
              </div>
            </div>
            <Button className={"rounded-full p-5"}>Subscribe</Button>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-2 rounded-full bg-accent px-4 py-2">
              <button className={"flex items-center gap-2 font-medium"}>
                <ThumbsUp size={20} />
                <span>1.5k</span>
              </button>
              <span className="border"></span>
              <button className={"flex items-center gap-2 font-medium"}>
                <ThumbsDown size={20} />
                <span>1k</span>
              </button>
            </div>
            <div className="flex gap-2 rounded-full bg-accent px-4 py-2">
              <button className={"flex items-center gap-2 font-medium"}>
                <Forward />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        <Description
          text={`
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur aut nobis perferendis hic nostrum. Voluptates repellendus deleniti dignissimos. Et repellat numquam iure vel veritatis quod labore ipsum qui dolore.
            `}
        />
        <div className="text-xl font-bold">133 Comments</div>
        <AddComment />
        <Comments />
      </div>
      <div className="col-span-4 flex flex-col gap-2 p-2">
        <SideVideoRecommendation />
      </div>
    </div>
  )
}

export default Video
