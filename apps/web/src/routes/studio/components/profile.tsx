import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import LogoImg from "@/assets/logo.png"
import { Link } from "react-router"
import { useMyChannel } from "@/queries/channel"
import { getProfileUrl } from "@/utils/video"
import SignOut from "@/components/sign-out"

const StudioProfile = () => {
  const { data: myChannel, isLoading } = useMyChannel()
  if (isLoading || !myChannel) return "Loading..."
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-9 w-9">
          <AvatarImage src={getProfileUrl(myChannel.id)} />
          <AvatarFallback>{myChannel.name[0]}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-60 p-0">
        <div className="flex items-start gap-3 border-b p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={getProfileUrl(myChannel.id)} />
            <AvatarFallback>{myChannel.name}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate">{myChannel.name}</p>
            <p className="truncate text-muted-foreground">{myChannel.email}</p>
            <Link to={`/@${myChannel.handle}`}>
              <Button variant={"link"} className="mt-1 h-auto p-0">
                View your channel
              </Button>
            </Link>
          </div>
        </div>

        <div className="px-2">
          <Link to="/">
            <Button variant="ghost" className="h-11 w-full justify-start">
              <img src={LogoImg} className="h-5 w-5 rounded-full" />
              Plausio
            </Button>
          </Link>
        </div>

        <div className="border-t p-2">
          <SignOut />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default StudioProfile
