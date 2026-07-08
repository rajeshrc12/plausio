import { createBrowserRouter } from "react-router"
import App from "@/routes/app"
import Home from "@/routes/app/home"
import Channel from "@/routes/app/channel"
import History from "@/routes/app/history"
import Playlist from "@/routes/app/playlist"
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
        path: "/channel",
        Component: Channel,
      },
      {
        path: "/history",
        Component: History,
      },
      {
        path: "/playlist",
        Component: Playlist,
      },
      {
        path: "/:id",
        Component: Video,
      },
    ],
  },
])

export default router
