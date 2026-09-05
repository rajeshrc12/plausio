import { useMe } from "@/queries/user"
import { Navigate, Outlet } from "react-router"

export function ProtectedRoute() {
  const { isError, data } = useMe()
  console.log(data)
  if (isError) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
