import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import ChannelDescription from "@/routes/app/components/channel-description"
import { Button } from "@workspace/ui/components/button"
import { Bell } from "lucide-react"
import VideoCard from "../components/video-card"
import { Link } from "react-router"
import { useChannel } from "@/hooks/useChannel"

const videos = [
  {
    id: 1,
    title: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptates tempore quibusdam non nulla eaque, quasi fuga, est ipsam distinctio cumque officia itaque obcaecati doloremque maiores aspernatur autem atque. Nam.
    How to use React?`,
    duration: "2:20",
    views: "300K",
    createdAt: "5 hours ago",
    thumbnail: "https://picsum.photos/seed/picsum/320/180",
  },
  {
    id: 2,
    title: "React Hooks Explained in 15 Minutes",
    duration: "15:42",
    views: "1.2M",
    createdAt: "2 days ago",
    thumbnail: "https://picsum.photos/seed/react/320/180",
  },
]
const Channel = () => {
  const { data: channel, isLoading } = useChannel()
  if (isLoading || !channel || !channel.profileImage) return "Loading..."
  return (
    <div className="flex flex-col p-5">
      <div className="h-36 overflow-hidden rounded-2xl">
        <img
          src={channel?.bannerImage}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex">
        <Avatar className={"m-5 h-40 w-40"}>
          <AvatarImage src={channel?.profileImage} />
          <AvatarFallback>{channel.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center gap-2">
          <div className="text-4xl font-bold">{channel.name}</div>
          <div className="flex gap-2 text-sm">
            <div className="font-medium">@{channel.handle}</div>
            <div className="text-muted-foreground">
              {channel.subscribers} subscribers
            </div>
            <div className="text-muted-foreground">{channel.videos} videos</div>
          </div>
          <ChannelDescription channel={channel} />
          <div>
            <Button className={"flex gap-2 rounded-full p-4"}>
              <Bell />
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="border-b">
        <button className="border-b-2 border-primary py-2">Videos</button>
      </div>
      <div className="grid grid-cols-3 gap-5 p-5">
        {videos.map((video) => (
          <Link key={video.id} to={`/${video.id}`}>
            <VideoCard video={video} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Channel
