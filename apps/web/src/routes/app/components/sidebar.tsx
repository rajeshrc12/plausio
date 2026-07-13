import { Link } from "react-router"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { useSidebar } from "@/hooks/useSidebar"
import { HomeIcon, TvIcon } from "lucide-react"
import { useMyChannel } from "@/hooks/useMyChannel"
import type { Channel } from "@workspace/db"

const menu = [
  {
    path: "/",
    name: "Home",
    Icon: HomeIcon,
  },
]

const AppSidebar = () => {
  const appSidebar = useSidebar((state) => state.appSidebar)
  const { data: channel } = useMyChannel()
  if (appSidebar)
    return (
      <div className="sidebar-scrollbar flex h-full w-60 shrink-0 flex-col gap-2 overflow-y-auto py-2">
        {menu?.map(({ path, name, Icon }) => (
          <Link
            key={name}
            to={path}
            className="mx-4 flex items-center gap-5 rounded-lg p-2 text-sm hover:bg-sidebar-accent"
          >
            <Icon />
            <div>{name}</div>
          </Link>
        ))}
        {channel?.handle && (
          <Link
            to={`/@${channel?.handle}`}
            className="mx-4 flex items-center gap-5 rounded-lg p-2 text-sm hover:bg-sidebar-accent"
          >
            <TvIcon />
            <div>Channel</div>
          </Link>
        )}

        <div className="text-md p-2 font-medium">Subscriptions</div>
        {channel?.subscriptions?.map(({ channel }: { channel: Channel }) => (
          <Link
            key={channel.id}
            to={`/@${channel.handle}`}
            className="mx-4 flex items-center gap-5 rounded-lg p-2 text-sm hover:bg-sidebar-accent"
          >
            <Avatar className={"h-6 w-6"}>
              <AvatarImage src={channel.profileImage} />
              <AvatarFallback>{channel.name[0]}</AvatarFallback>
            </Avatar>
            <div>{channel.name}</div>
          </Link>
        ))}
      </div>
    )
}

export default AppSidebar
