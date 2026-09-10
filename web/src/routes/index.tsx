import App from "@/routes/app"
import Chat from "@/routes/app/chat"
import ChatId from "@/routes/app/chat/id"
import Project from "@/routes/app/project"
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
            path: "chat/:id",
            Component: ChatId,
          },
          {
            path: "project",
            Component: Project,
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
