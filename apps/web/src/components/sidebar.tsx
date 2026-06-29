import { Button } from "@workspace/ui/components/button"
import { HomeIcon, MenuIcon, TimerIcon } from "lucide-react"
import { Link, useLocation } from "react-router"

const Sidebar = () => {
  const location = useLocation()

  const links = [
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      name: "History",
      href: "/history",
      icon: TimerIcon,
    },
    {
      name: "Playlist",
      href: "/playlist",
      icon: MenuIcon,
    },
  ]
  return (
    <div className="flex flex-col px-2">
      {links.map((link) => {
        const Icon = link.icon
        const active = location.pathname === link.href

        return (
          <Link key={link.href} to={link.href}>
            <Button
              variant={active ? "secondary" : "ghost"}
              className="flex w-full justify-start gap-4 p-5"
            >
              <Icon className="size-6" />
              {link.name}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
