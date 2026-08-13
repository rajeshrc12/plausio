import { createBrowserRouter } from "react-router"
import AppHome from "@/routes/app/home"
import App from "@/routes/app"
import Dashboard from "@/routes/dashboard"
import Series from "@/routes/app/series"
import Movie from "@/routes/app/movie"
import Video from "@/routes/app/video"

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: AppHome,
      },
      {
        path: "/series",
        Component: Series,
      },
      {
        path: "/movie",
        Component: Movie,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
    {
    path: "/watch",
    Component: Video,
  },
])

export default router
