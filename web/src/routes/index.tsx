import { createBrowserRouter } from "react-router"
import AppHome from "@/routes/app/home"
import App from "@/routes/app"
import Dashboard from "@/routes/dashboard"
import Series from "@/routes/app/series"
import Movie from "@/routes/app/movie"
import Video from "@/routes/app/video"
import MyAccount from "@/routes/app/my-account"
import DashboardHome from "@/routes/dashboard/home"
import DashboardMovie from "@/routes/dashboard/movie"
import DashboardProfile from "@/routes/dashboard/profile"
import MovieList from "@/routes/dashboard/movie/list"
import CreateMovie from "@/routes/dashboard/movie/create"
import AdminLogin from "@/routes/dashboard/admin-login"

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
        path: "series",
        Component: Series,
      },
      {
        path: "movie",
        Component: Movie,
      },
      {
        path: "my-account",
        Component: MyAccount,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        path: "",
        Component: DashboardHome,
      },
      {
        path: "movie",
        Component: DashboardMovie,
        children: [
          {
            path: "",
            Component: MovieList,
          },
          {
            path: "create",
            Component: CreateMovie,
          },
        ],
      },
      {
        path: "profile",
        Component: DashboardProfile,
      },
    ],
  },
  {
    path: "/admin-login",
    Component: AdminLogin,
  },
  {
    path: "/watch",
    Component: Video,
  },
])

export default router
