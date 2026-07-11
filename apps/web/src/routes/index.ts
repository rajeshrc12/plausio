import { createBrowserRouter } from "react-router"
import App from "@/routes/app"
import Home from "@/routes/app/home"
import Channel from "@/routes/app/channel"
import Video from "@/routes/app/video"
import Studio from "@/routes/studio"
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
      {
        path: "/channel",
        Component: Channel,
      },
      {
        path: "/:id",
        Component: Video,
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
