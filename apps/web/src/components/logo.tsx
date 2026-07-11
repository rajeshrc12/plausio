import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import LogoImg from "@/assets/logo/logo.png"
const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className={"rounded"}>
        <AvatarImage src={LogoImg} />
        <AvatarFallback>name</AvatarFallback>
      </Avatar>
      <div className="text-xl font-medium">Plausio</div>
    </div>
  )
}

export default Logo
