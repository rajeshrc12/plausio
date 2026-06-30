import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { CircleUserRound, Clapperboard, LayoutDashboard } from "lucide-react"
import { Link, useLocation } from "react-router"

const SidebarStudio = () => {
  const location = useLocation()

  const links = [
    {
      name: "Dashboard",
      href: "/studio",
      icon: LayoutDashboard,
    },
    {
      name: "Content",
      href: "/studio/content",
      icon: Clapperboard,
    },
  ]

  return (
    <aside className="sticky top-14 h-[calc(100vh-56px)] w-60 bg-background">
      <div className="px-4 py-6">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>
              <CircleUserRound className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">Your channel</p>
            <h2 className="font-semibold">Channel Name</h2>
          </div>
        </div>
      </div>

      <nav className="p-2">
        <div className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            const active = location.pathname === link.href

            return (
              <Link key={link.href} to={link.href}>
                <Button
                  variant="ghost"
                  className={`h-11 w-full justify-start gap-3 rounded-xl px-3 ${
                    active
                      ? "bg-muted font-semibold text-foreground hover:bg-muted"
                      : "hover:bg-accent"
                  }`}
                >
                  <Icon className="size-5" />
                  <span>{link.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}

export default SidebarStudio
