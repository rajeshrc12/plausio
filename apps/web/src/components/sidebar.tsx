import { Button } from "@workspace/ui/components/button"
import {
  Clock3,
  History,
  Home,
  ListVideo,
  PlaySquare,
  ThumbsUp,
} from "lucide-react"
import { Link, useLocation } from "react-router"

const Sidebar = () => {
  const location = useLocation()

  const links = [
    {
      section: "Main",
      items: [
        { name: "Home", href: "/", icon: Home },
        { name: "Shorts", href: "/shorts", icon: PlaySquare },
        { name: "Subscriptions", href: "/subscriptions", icon: ListVideo },
      ],
    },
    {
      section: "You",
      items: [
        { name: "History", href: "/history", icon: History },
        { name: "Watch later", href: "/watch-later", icon: Clock3 },
        { name: "Liked videos", href: "/liked", icon: ThumbsUp },
      ],
    },
  ]

  return (
    <aside className="sticky top-14 h-[calc(100vh-56px)] w-60 overflow-y-auto bg-white px-3 py-2">
      {links.map((group) => (
        <div key={group.section} className="mb-4">
          <h3 className="mb-2 px-3 text-sm font-semibold text-gray-500">
            {group.section}
          </h3>

          <div className="space-y-1">
            {group.items.map((link) => {
              const Icon = link.icon
              const active = location.pathname === link.href

              return (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant="ghost"
                    className={`h-11 w-full justify-start gap-5 rounded-xl px-3 ${
                      active
                        ? "bg-gray-100 font-semibold hover:bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </aside>
  )
}

export default Sidebar
