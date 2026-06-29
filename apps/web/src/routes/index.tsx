import { createBrowserRouter } from "react-router"
import App from "@/App"
import VideoId from "@/routes/video/id"
import Home from "@/routes/home"
import VideoList from "@/routes/video/list"
import History from "@/routes/home/history"
import Playlist from "@/routes/home/play-list"

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: Home,
        children: [
          {
            index: true,
            Component: VideoList,
          },
          {
            path: "history",
            Component: History,
          },
          {
            path: "playlist",
            Component: Playlist,
          },
        ],
      },
      {
        path: ":id",
        Component: VideoId,
      },
    ],
  },
])

export default router
