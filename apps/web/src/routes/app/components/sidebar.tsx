import { Link, useLocation } from "react-router"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { HomeIcon, TvIcon } from "lucide-react"
import type { Channel } from "@workspace/db"
import { getProfileUrl } from "@/utils/video"
import { useMyChannel } from "@/queries/channel"
import SignIn from "@/components/sign-in"

const menu = [
  {
    path: "/",
    name: "Home",
    Icon: HomeIcon,
  },
]

const AppSidebar = () => {
  const { data: channel, isError } = useMyChannel()
  const { pathname } = useLocation()

  if (!pathname.includes("watch"))
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
        <div className="mx-4">
          {isError ? (
            <SignIn />
          ) : (
            channel?.subscriptions?.map(({ channel }: { channel: Channel }) => (
              <Link
                key={channel.id}
                to={`/@${channel.handle}`}
                className="flex items-center gap-5 rounded-lg p-2 text-sm hover:bg-sidebar-accent"
              >
                <Avatar className={"h-6 w-6"}>
                  <AvatarImage src={getProfileUrl(channel?.id)} />
                  <AvatarFallback>{channel.name[0]}</AvatarFallback>
                </Avatar>
                <div>{channel.name}</div>
              </Link>
            ))
          )}
        </div>
      </div>
    )
}

export default AppSidebar
