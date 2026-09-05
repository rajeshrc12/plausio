import App from "@/routes/app"
import Chat from "@/routes/app/chat"
import Connector from "@/routes/app/connector"
import Create from "@/routes/app/connector/create"
import Home from "@/routes/home"
import NotFound from "@/routes/not-found"
import { ProtectedRoute } from "@/routes/protected"
import { createBrowserRouter } from "react-router"
const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        Component: App,
        children: [
          {
            index: true,
            Component: Chat,
          },
          {
            path: "connector",
            Component: Connector,
          },
          {
            path: "connector/create",
            Component: Create,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
])

export default router
