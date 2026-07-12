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
const channel = {
  name: "Sony Music India",
  description: `
Welcome to Sony Music India's official YouTube channel, the ultimate destination for music enthusiasts and fans of the Indian music scene. Immerse yourself in a world of melodies, rhythms, and harmonies as we proudly present "Sony Music India - Home To India's Biggest Music Hits."
Step into a realm where musical brilliance knows no bounds, and every beat resonates with the heartbeat of a nation. With a legacy that spans genres and generations, our channel is a testament to the power of music to unite, inspire, and captivate. From timeless classics to contemporary chart-toppers, we curate a diverse range of sounds that cater to every palate.
hit that subscribe button and become a part of our musical family. Tune in daily to satiate your cravings for remarkable tunes, captivating visuals, and the sheer joy that great music brings. 
👉 Subscribe: - https://www.youtube.com/@SonyMusicIndia/videos
  `,
  handle: "sonymusicindia",
  country: "India",
  createdAt: "Jan 21, 2002",
  subscribers: "12.7M",
  videos: "1,222",
  views: "1,223,444,111",
}
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
  return (
    <div className="flex flex-col p-5">
      <div className="h-36 overflow-hidden rounded-2xl">
        <img
          src="https://picsum.photos/1546/423"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex">
        <Avatar className={"m-5 h-40 w-40"}>
          <AvatarImage src={`https://i.pravatar.cc/150?img=1`} />
          <AvatarFallback>name</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center gap-2">
          <div className="text-4xl font-bold">Sony Music India</div>
          <div className="flex gap-2 text-sm">
            <div className="font-medium">@SonyMusicIndia</div>
            <div className="text-muted-foreground">71.9M subscribers</div>
            <div className="text-muted-foreground">12.5K videos</div>
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
          <Link to={`/${video.id}`}>
            <VideoCard video={video} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Channel
