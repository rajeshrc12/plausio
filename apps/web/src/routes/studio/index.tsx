import { Outlet } from "react-router"
import StudioNavbar from "@/routes/studio/components/navbar"
import StudioSidebar from "@/routes/studio/components/sidebar"

const Studio = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <StudioNavbar />
      <div className="flex flex-1 overflow-hidden">
        <StudioSidebar />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Studio
