import Sidebar from "@/routes/app/components/sidebar"
import { Outlet } from "react-router"

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default App
