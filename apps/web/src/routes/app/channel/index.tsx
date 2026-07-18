import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import ChannelDescription from "@/routes/app/components/channel-description"
import VideoCard from "@/routes/app/components/video-card"
import { getProfileUrl } from "@/utils/video"
import { useChannel, useMyChannel } from "@/queries/channel"
import Subscribe from "@/routes/app/components/subscribe"

const Channel = ({ handle }: { handle: string }) => {
  const { data: channel, isLoading } = useChannel(handle)

  const { data: myChannel } = useMyChannel()
  if (isLoading || !channel) return "Loading..."
  return (
    <div className="flex flex-col p-5">
      <div className="h-36 overflow-hidden rounded-2xl">
        <img
          src={getProfileUrl(channel.id)}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex">
        <Avatar className={"m-5 h-40 w-40"}>
          <AvatarImage src={getProfileUrl(channel.id)} />
          <AvatarFallback>{channel.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center gap-2">
          <div className="text-4xl font-bold">{channel.name}</div>
          <div className="flex gap-2 text-sm">
            <div className="font-medium">@{channel.handle}</div>
            <div className="text-muted-foreground">
              {channel.subscribers} subscribers
            </div>
            <div className="text-muted-foreground">
              {channel.videos.length} videos
            </div>
          </div>
          <ChannelDescription channel={channel} />
          {myChannel?.id !== channel.id && (
            <div>
              <Subscribe id={channel.id} />
            </div>
          )}
        </div>
      </div>
      <div className="border-b">
        <button className="border-b-2 border-primary py-2">Videos</button>
      </div>
      <div className="grid grid-cols-3 gap-5 p-5">
        {channel?.videos?.map((video) => (
          <VideoCard key={video.id} video={video} channel={channel} />
        ))}
      </div>
    </div>
  )
}

export default Channel
