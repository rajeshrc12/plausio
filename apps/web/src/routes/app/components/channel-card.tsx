import { useChannel } from "@/queries/channel"
import { getProfileUrl } from "@/utils/video"
import type { Channel } from "@workspace/db"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Link } from "react-router"

const ChannelCard = ({ channel }: { channel: Channel }) => {
  const { data } = useChannel(`@${channel.handle}`)
  return (
    <Link to={`/@${channel?.handle}`} className="flex gap-3">
      <Avatar className={"h-10 w-10"}>
        <AvatarImage src={getProfileUrl(channel?.id)} />
        <AvatarFallback>{channel?.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-bold">{channel?.name}</div>
        <div className="text-xs text-muted-foreground">
          {data?.subscribers} subscribers
        </div>
      </div>
    </Link>
  )
}

export default ChannelCard
