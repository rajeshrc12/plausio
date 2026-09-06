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
    <aside className="flex h-full w-56 shrink-0 flex-col border-r bg-background">
      {/* Brand */}
      <div className="flex h-14 shrink-0 items-center border-b px-5">
        <Link
          to="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          Plausio
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {menu?.map(({ path, name, Icon }) => {
          const isActive = path === pathname

          return (
            <Link key={name} to={path} className="w-full">
              <Button
                variant="ghost"
                className={cn(
                  "h-10 w-full justify-start gap-3 rounded-lg px-3 text-sm font-medium",
                  "text-muted-foreground transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  isActive &&
                    "bg-muted text-foreground shadow-xs hover:bg-muted"
                )}
              >
                <Icon
                  className={cn(
                    "size-4.5 shrink-0 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                />

                <span className="truncate">{name}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-3">
        <div className="rounded-lg px-3 py-2">
          <p className="text-xs font-medium text-foreground">Plausio</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            AI-powered search
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
