import { Analytics } from "@vercel/analytics/react"
import AppNavbar from "@/routes/app/components/navbar"
import { Outlet } from "react-router"
import { env } from "@/config/env"

const App = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
      {env.WEB_ENV === "prod" && <Analytics />}
    </>
  )
}

export default App
