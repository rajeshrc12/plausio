import Sidebar from "@/components/sidebar"
import { Outlet } from "react-router"

const Home = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-60 shrink-0 overflow-y-auto">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Home
