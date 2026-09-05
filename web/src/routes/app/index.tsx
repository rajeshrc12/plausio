import Sidebar from "@/routes/app/components/sidebar"
import { Outlet } from "react-router"

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default App
