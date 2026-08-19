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
      className={`fixed top-0 left-0 z-10 flex w-full items-center justify-between px-5 py-3 sm:px-8 sm:py-4 lg:px-14 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300`}
    >
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        <div className="text-lg font-semibold sm:text-xl">Plausio</div>

        <Link
          to="/"
          className="flex size-9 items-center justify-center rounded-md sm:size-auto"
          aria-label="Home"
        >
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
