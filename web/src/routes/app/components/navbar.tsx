import Logo from "@/components/logo"
import AppProfile from "@/routes/app/components/profile"

const AppNavbar = () => {
  return (
    <div className="flex justify-between border-b p-4">
      <Logo />
      <AppProfile />
    </div>
  )
}

export default AppNavbar
