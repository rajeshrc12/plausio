import { HomeIcon } from "lucide-react"
import { Link } from "react-router"

const menu = [
  {
    path: "/series",
    name: "Series",
  },
  {
    path: "/movie",
    name: "Movies",
  },
]
const AppNavbar = () => {
  return (
    <div className="sticky top-0 left-0 z-10 flex items-center gap-5 bg-background px-20 py-2">
      <div className="text-2xl font-medium">Plausio</div>
      <div className="flex">
        <Link
          to={"/"}
          className="flex items-center rounded-lg p-2 text-sm hover:bg-sidebar-accent"
        >
          <HomeIcon />
        </Link>
        {menu?.map(({ path, name }) => (
          <Link
            key={name}
            to={path}
            className="flex items-center rounded-lg p-2 text-sm hover:bg-sidebar-accent"
          >
            <div>{name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AppNavbar
