import { useMe } from "@/queries/admin"
import DashboardNavbar from "@/routes/dashboard/components/navbar"
import DashboardSidebar from "@/routes/dashboard/components/sidebar"
import { Outlet } from "react-router"

const Dashboard = () => {
  const { data } = useMe()
  if (data?.userName)
    return (
      <div className="flex h-screen flex-col">
        <DashboardNavbar />

        <div className="flex min-h-0 flex-1">
          <DashboardSidebar />

          <main className="min-h-0 w-full overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    )
}

export default Dashboard
