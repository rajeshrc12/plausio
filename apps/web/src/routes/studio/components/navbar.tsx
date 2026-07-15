import Logo from "@/components/logo"
import StudioProfile from "@/routes/studio/components/profile"

const StudioNavbar = () => {
  return (
    <div className="flex justify-between border-b p-4">
      <Logo />
      <StudioProfile />
    </div>
  )
}

export default StudioNavbar
