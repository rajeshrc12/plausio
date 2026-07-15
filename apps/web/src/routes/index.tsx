import { createBrowserRouter } from "react-router"
import App from "@/routes/app"
import Studio from "@/routes/studio"
import Home from "@/routes/app/home"
import Dashboard from "@/routes/studio/dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: Home,
      },
    ],
  },
  {
    path: "/studio",
    Component: Studio,
    children: [
      {
        path: "",
        Component: Dashboard,
      },
    ],
  },
])

export default router
