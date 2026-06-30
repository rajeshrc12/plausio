import { Button } from "@workspace/ui/components/button"
import { Clock3, History, Home } from "lucide-react"
import { Link, useLocation } from "react-router"

const Sidebar = () => {
  const location = useLocation()

  const links = [
    {
      section: "Main",
      items: [{ name: "Home", href: "/", icon: Home }],
    },
    {
      section: "You",
      items: [
        { name: "History", href: "/history", icon: History },
        { name: "Playlist", href: "/playlist", icon: Clock3 },
      ],
    },
  ]

  return (
    <aside className="sticky top-14 h-[calc(100vh-56px)] w-60 overflow-y-auto bg-background px-3 py-2">
      {links.map((group) => (
        <div key={group.section} className="mb-4">
          <h3 className="mb-2 px-3 text-sm font-semibold text-muted-foreground">
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
                        ? "bg-muted font-semibold text-foreground hover:bg-muted"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="size-5 shrink-0" />
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
