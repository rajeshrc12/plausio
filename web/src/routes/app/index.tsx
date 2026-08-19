import { Analytics } from "@vercel/analytics/react"
import AppNavbar from "@/routes/app/components/navbar"
import { Outlet } from "react-router"

const App = () => {
  return (
    <div>
      <AppNavbar />
      <Outlet />
      <Analytics />
    </div>
  )
}

export default App
