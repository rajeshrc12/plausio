import { createBrowserRouter } from "react-router"
import App from "@/routes/app"

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
])

export default router
