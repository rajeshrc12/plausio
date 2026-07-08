import { Button } from "@workspace/ui/components/button"
import { Link } from "react-router"

const AppSidebar = () => {
  const menu = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/channel",
      name: "Channel",
    },
    {
      path: "/history",
      name: "History",
    },
    {
      path: "/playlist",
      name: "Playlist",
    },
  ]
  return (
    <div className="flex h-full w-50 shrink-0 flex-col gap-2 overflow-y-auto border-r p-2">
      {menu.map((m) => (
        <Link to={m.path} key={m.name}>
          <Button variant="ghost">{m.name}</Button>
        </Link>
      ))}
    </div>
  )
}

export default AppSidebar
