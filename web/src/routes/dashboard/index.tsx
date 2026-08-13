import DashboardNavbar from "@/routes/dashboard/components/navbar"
import DashboardSidebar from "@/routes/dashboard/components/sidebar"
import { Outlet } from "react-router"

const Dashboard = () => {
  return (
    <div className="flex h-screen flex-col">
      <DashboardNavbar />
      <div className="flex h-full">
        <DashboardSidebar />
        <div className="overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
