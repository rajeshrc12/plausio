import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import ChannelDescription from "@/routes/app/components/channel-description"
import { Button } from "@workspace/ui/components/button"
import VideoCard from "@/routes/app/components/video-card"
import { Link } from "react-router"
import { useChannel } from "@/hooks/useChannel"
import type { VideoWithChannel } from "@/types/video"
import { useMyChannel } from "@/hooks/useMyChannel"

const Channel = ({ name }: { name: string }) => {
  const { data: channel, isLoading, isError } = useChannel(name)
  const { data: myChannel, isError: myChannelError } = useMyChannel()
  if (isLoading) return "Loading..."
  if (isError) {
    return "Channel not found"
  }

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
              {channel.subscribersCount} subscribers
            </div>
            <div className="text-muted-foreground">
              {channel.videoCount} videos
            </div>
          </div>
          <ChannelDescription channel={channel} />
          {myChannel?.name !== channel?.handle && !myChannelError && (
            <div>
              <Button
                variant={channel?.isSubscribed ? "secondary" : "default"}
                className={"flex gap-2 rounded-full p-4"}
              >
                {channel?.isSubscribed ? "Unsubscribe" : "Subscribe"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="border-b">
        <button className="border-b-2 border-primary py-2">Videos</button>
      </div>
      <div className="grid grid-cols-3 gap-5 p-5">
        {channel?.videos?.map((video: VideoWithChannel) => (
          <Link key={video.id} to={`/watch?v=${video.id}`}>
            <VideoCard video={video} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Channel
