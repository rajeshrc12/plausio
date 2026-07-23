import { createBrowserRouter } from "react-router"
import App from "@/routes/app"
import Studio from "@/routes/studio"
import Home from "@/routes/app/home"
import Dashboard from "@/routes/studio/dashboard"
import Content from "@/routes/studio/content"
import Video from "@/routes/app/video"

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
        path: "/:path",
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
      {
        path: "content",
        Component: Content,
      },
    ],
  },
])

export default router
