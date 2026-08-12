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
    <div className="sticky top-0 left-0 z-10 flex items-center gap-3 bg-background px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 md:px-10 lg:gap-5 lg:px-20">
      {/* Logo */}
      <div className="shrink-0 text-xl font-medium sm:text-2xl">Plausio</div>

      {/* Navigation */}
      <div className="flex min-w-0 flex-1 scrollbar-none items-center overflow-x-auto">
        <Link
          to="/"
          className="flex shrink-0 items-center rounded-lg p-2 text-sm hover:bg-sidebar-accent"
        >
          <HomeIcon className="size-4 sm:size-5" />
        </Link>

        {menu?.map(({ path, name }) => (
          <Link
            key={name}
            to={path}
            className="flex shrink-0 items-center rounded-lg p-2 text-sm whitespace-nowrap hover:bg-sidebar-accent"
          >
            <div>{name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AppNavbar
