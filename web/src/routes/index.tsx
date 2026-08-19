import { createBrowserRouter } from "react-router"
import AppHome from "@/routes/app/home"
import App from "@/routes/app"
import Dashboard from "@/routes/dashboard"
import Browse from "@/routes/app/movie/browse"
import Play from "@/routes/app/play"
import DashboardHome from "@/routes/dashboard/home"
import DashboardMovie from "@/routes/dashboard/movie"
import DashboardProfile from "@/routes/dashboard/profile"
import MovieList from "@/routes/dashboard/movie/list"
import CreateMovie from "@/routes/dashboard/movie/create"
import AdminLogin from "@/routes/dashboard/admin-login"
import Detail from "@/routes/app/movie/detail"
import NotFound from "@/routes/not-found"
import MyAccount from "@/routes/app/my-account"

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
        path: "movies",
        Component: Browse,
      },
      {
        path: "movie/:id",
        Component: Detail,
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
    path: "/play/:id",
    Component: Play,
  },
  {
    path: "*",
    Component: NotFound,
  },
])

export default router
