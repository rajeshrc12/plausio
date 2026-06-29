import Profile from "@/components/profile"

const Navbar = () => {
  return (
    <div className="flex h-14 justify-between px-4">
      <div>Plausio</div>
      <input placeholder="search" />
      <Profile />
    </div>
  )
}

export default Navbar
