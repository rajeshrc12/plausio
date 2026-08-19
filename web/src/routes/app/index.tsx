import { Analytics } from "@vercel/analytics/react"
import AppNavbar from "@/routes/app/components/navbar"
import { Outlet } from "react-router"
import { env } from "@/config/env"
import Login from "@/routes/app/components/login"

const App = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
      <Login />
      {env.WEB_ENV === "prod" && <Analytics />}
    </>
  )
}

export default App
