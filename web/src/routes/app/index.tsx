import AppNavbar from "@/routes/app/components/navbar"
import { Outlet } from "react-router"

const App = () => {
  return (
    <div>
      <AppNavbar />
      <Outlet />
    </div>
  )
}

export default App
