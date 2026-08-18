import Menu from "@/routes/app/components/menu"
import { HomeIcon } from "lucide-react"
import { Link } from "react-router"

const AppNavbar = () => {
  return (
    <div className="fixed top-0 left-0 z-10 flex w-full justify-between bg-linear-to-b from-background from-60% to-transparent px-14 py-4">
      <div className="flex gap-8">
        <div className="relative bottom-1 flex gap-5 text-xl">Plausio</div>
        <Link to={"/"}>
          <HomeIcon className="size-5" />
        </Link>
        <Link className="text-sm font-bold" to={"/movies"}>
          Movies
        </Link>
      </div>
      <Menu />
    </div>
  )
}

export default AppNavbar
