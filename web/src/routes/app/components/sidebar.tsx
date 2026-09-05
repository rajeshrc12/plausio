import { Button } from "@/components/ui/button"
import { cn } from "cn"
import { Cable, MessageCircle } from "lucide-react"
import { Link, useLocation } from "react-router"

const menu = [
  {
    path: "/app",
    name: "New chat",
    Icon: MessageCircle,
  },
  {
    path: "/app/connector",
    name: "Connectors",
    Icon: Cable,
  },
]

const Sidebar = () => {
  const { pathname } = useLocation()
  return (
    <div className="w-50 border-r">
      <div>Plausio</div>
      <div className="flex flex-col justify-start px-2">
        {menu?.map(({ path, name, Icon }) => {
          const isActive = path === pathname
          return (
            <Link key={name} to={path}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={"flex h-10 w-full justify-start gap-5"}
              >
                <Icon className={cn("h-6! w-6! transition-colors")} />
                <div>{name}</div>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
