import { LayoutDashboard, TableOfContents, Wand } from "lucide-react"
import { Link } from "react-router"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { useChannel } from "@/hooks/useChannel"
const menu = [
  {
    path: "/studio",
    name: "Dashboard",
    Icon: LayoutDashboard,
  },
  {
    path: "content",
    name: "Content",
    Icon: TableOfContents,
  },
  {
    path: "customization",
    name: "Customization",
    Icon: Wand,
  },
]
const StudioSidebar = () => {
  const { data: channel, isLoading } = useChannel()
  const initials =
    channel?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() ?? "C"
  if (isLoading || !channel) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
  }
  return (
    <div className="sidebar-scrollbar relative flex h-full w-60 shrink-0 flex-col gap-2 overflow-y-auto py-2">
      <div className="sticky top-0 flex flex-col items-center bg-background p-2">
        <Avatar className={"h-28 w-28"}>
          <AvatarImage src={channel.profileImage} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="pt-2 text-xs font-medium">Your channel</div>
        <div className="pt-1 text-xs text-muted-foreground">{channel.name}</div>
      </div>
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
    </div>
  )
}

export default StudioSidebar
