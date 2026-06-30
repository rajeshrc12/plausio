import NavbarHome from "@/components/navbar-home"
import { Outlet } from "react-router"

const App = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="sticky top-0 z-50 shrink-0">
        <NavbarHome />
      </header>
      <Outlet />
    </div>
  )
}

export default App
