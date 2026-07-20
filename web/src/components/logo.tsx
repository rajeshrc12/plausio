import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import LogoImg from "@/assets/logo.png"
import { Link } from "react-router"
const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-3">
        <Avatar className={"rounded"}>
          <AvatarImage src={LogoImg} />
          <AvatarFallback>name</AvatarFallback>
        </Avatar>
        <div className="text-xl font-medium">Plausio</div>
      </div>
    </Link>
  )
}

export default Logo
