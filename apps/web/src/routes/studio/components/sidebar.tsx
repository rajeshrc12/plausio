import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { LayoutDashboard } from "lucide-react"
import { NavLink } from "react-router"

const menu = [
  {
    path: "/studio",
    name: "Dashboard",
    Icon: LayoutDashboard,
  },
]

const StudioSidebar = () => {
  return (
    <div className="sidebar-scrollbar relative flex h-full w-60 shrink-0 flex-col gap-2 overflow-y-auto py-2">
      <div className="sticky top-0 flex flex-col items-center bg-background p-2">
        <Avatar className={"h-28 w-28"}>
          <AvatarImage src="" />
          <AvatarFallback>RC</AvatarFallback>
        </Avatar>
        <div className="pt-2 text-xs font-medium">Your channel</div>
        <div className="pt-1 text-xs text-muted-foreground">
          Rajesh charhajari
        </div>
      </div>
      <div className="flex flex-col justify-start px-5">
        {menu?.map(({ path, name, Icon }) => (
          <NavLink key={name} to={path}>
            {({ isActive }) => (
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
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default StudioSidebar
