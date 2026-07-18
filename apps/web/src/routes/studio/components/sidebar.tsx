import { useMyChannel } from "@/queries/channel"
import { getProfileUrl } from "@/utils/video"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { LayoutDashboard, TvMinimalPlay } from "lucide-react"
import { Link, useLocation } from "react-router"

const menu = [
  {
    path: "/studio",
    name: "Dashboard",
    Icon: LayoutDashboard,
  },
  {
    path: "/studio/content",
    name: "Content",
    Icon: TvMinimalPlay,
  },
]

const StudioSidebar = () => {
  const { pathname } = useLocation()
  const { data: myChannel, isLoading } = useMyChannel()
  if (isLoading || !myChannel) return "Loading..."
  return (
    <div className="sidebar-scrollbar relative flex h-full w-60 shrink-0 flex-col gap-2 overflow-y-auto py-2">
      <div className="sticky top-0 flex flex-col items-center bg-background p-2">
        <Avatar className={"h-28 w-28"}>
          <AvatarImage src={getProfileUrl(myChannel.id)} />
          <AvatarFallback>{myChannel.name[0]}</AvatarFallback>
        </Avatar>
        <div className="pt-2 text-xs font-medium">Your channel</div>
        <div className="pt-1 text-xs text-muted-foreground">
          {myChannel.name}
        </div>
      </div>
      <div className="flex flex-col justify-start px-5">
        {menu?.map(({ path, name, Icon }) => {
          const isActive = path === pathname
          return (
            <Link key={name} to={path}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={"flex h-10 w-full justify-start gap-5"}
              >
                <Icon
                  className={cn(
                    "h-6! w-6! transition-colors",
                    isActive && "fill-current"
                  )}
                />
                <div>{name}</div>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default StudioSidebar
