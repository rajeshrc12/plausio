import LoginButton from "@/components/login"

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <div>Plausio</div>
      <LoginButton />
    </div>
  )
}

export default Navbar
