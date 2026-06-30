import NavbarStudio from "@/components/navbar-studio"
import SidebarStudio from "@/components/sidebar-studio"
import { Outlet } from "react-router"

const Studio = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="sticky top-0 z-50 shrink-0">
        <NavbarStudio />
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-60 shrink-0 overflow-y-auto">
          <SidebarStudio />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Studio
