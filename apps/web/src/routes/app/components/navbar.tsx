import { Input } from "@workspace/ui/components/input"
import Logo from "@/components/logo"
import AppProfile from "@/routes/app/components/profile"

const AppNavbar = () => {
  return (
    <div className="flex justify-between border-b py-3 pr-4 pl-6">
      <div className="flex items-center justify-center gap-5">
        <Logo />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Search video"
          className="w-80 rounded-full"
        />
      </div>
      <AppProfile />
    </div>
  )
}

export default AppNavbar
