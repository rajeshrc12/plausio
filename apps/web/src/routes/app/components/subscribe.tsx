import { getProfileUrl } from "@/utils/video"
import type { Channel } from "@workspace/db"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Link } from "react-router"

const Subscribe = ({ channel }: { channel: Channel }) => {
  return (
    <Link to={`/@${channel?.handle}`} className="flex gap-3">
      <Avatar className={"h-10 w-10"}>
        <AvatarImage src={getProfileUrl(channel?.id)} />
        <AvatarFallback>{channel?.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-bold">{channel?.name}</div>
        <div className="text-xs text-muted-foreground">397k subscribers</div>
      </div>
      <Button className={"rounded-full p-5"}>Subscribe</Button>
    </Link>
  )
}

export default Subscribe
