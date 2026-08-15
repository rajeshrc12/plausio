import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Play } from "lucide-react"
import { Link, useLocation } from "react-router"

const menu = [
  {
    path: "/dashboard",
    name: "Home",
    Icon: LayoutDashboard,
  },
  {
    path: "/dashboard/movie",
    name: "Movie",
    Icon: Play,
  },
]

const DashboardSidebar = () => {
  const { pathname } = useLocation()
  return (
    <div className="w-60 border-r pt-2">
      <div className="flex flex-col justify-start px-2">
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

export default DashboardSidebar
