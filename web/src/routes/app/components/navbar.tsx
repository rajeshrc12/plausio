import Menu from "@/routes/app/components/menu"
import { HomeIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"

const AppNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY === 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 z-10 flex w-full justify-between px-14 py-4 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex gap-8">
        <div className="relative bottom-1 text-xl">Plausio</div>

        <Link to="/">
          <HomeIcon className="size-5" />
        </Link>

        <Link className="text-sm font-bold" to="/movies">
          Movies
        </Link>
      </div>

      <Menu />
    </div>
  )
}

export default AppNavbar
