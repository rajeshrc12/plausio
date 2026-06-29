import Profile from "@/components/profile"
import { Input } from "@workspace/ui/components/input"
import { Menu, Search, Mic, Bell } from "lucide-react"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-white px-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold">Plausio</h1>
      </div>

      {/* Center */}
      <div className="hidden max-w-2xl flex-1 items-center justify-center px-8 md:flex">
        <div className="flex w-full max-w-xl">
          <Input
            type="text"
            placeholder="Search"
            className="h-10 w-full rounded-l-full border border-gray-300 px-4 outline-none focus:border-blue-500"
          />

          <button className="flex h-10 w-16 items-center justify-center rounded-r-full border border-l-0 border-gray-300 bg-gray-100 hover:bg-gray-200">
            <Search size={20} />
          </button>
        </div>

        <button className="ml-4 rounded-full bg-gray-100 p-2 hover:bg-gray-200">
          <Mic size={20} />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell size={22} />
        </button>

        <Profile />
      </div>
    </header>
  )
}

export default Navbar
