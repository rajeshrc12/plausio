import { Outlet } from "react-router"
import AppNavbar from "@/routes/app/components/navbar"
import AppSidebar from "@/routes/app/components/sidebar"

const App = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <AppNavbar />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
