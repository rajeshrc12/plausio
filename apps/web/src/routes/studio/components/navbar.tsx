import Logo from "@/components/logo"
import StudioProfile from "@/routes/studio/components/profile"

const StudioNavbar = () => {
  return (
    <div className="flex justify-between border-b py-3 pr-4 pl-6">
      <div className="flex items-center justify-center gap-5">
        <Logo />
      </div>
      <StudioProfile />
    </div>
  )
}

export default StudioNavbar
