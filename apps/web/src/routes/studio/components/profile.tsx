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
import LogoImg from "@/assets/logo/logo.png"

import { LogOut, TvIcon } from "lucide-react"
import { Link } from "react-router"
import channelApi from "@/api/channel"
import { useMyChannel } from "@/hooks/useMyChannel"

const StudioProfile = () => {
  const { data: channel, isLoading } = useMyChannel()
  const initials =
    channel?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() ?? "C"
  const logout = async () => {
    await channelApi.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    )
    window.location.href = `/`
  }
  if (isLoading || !channel) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-9 w-9">
          <AvatarImage src={channel.profileImage} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-60 p-0">
        {/* Header */}
        <div className="flex items-start gap-3 border-b p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={channel.profileImage} />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{channel.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {channel.email}
            </p>
          </div>
        </div>
        <div className="px-2">
          <Link to={`/@${channel.handle}`}>
            <Button variant="ghost" className="h-11 w-full justify-start">
              <TvIcon className="mr-3 h-5 w-5" />
              Your channel
            </Button>
          </Link>
        </div>
        <div className="px-2">
          <Link to={"/"}>
            <Button variant="ghost" className="h-11 w-full justify-start">
              <Avatar className="mr-3 h-4 w-4">
                <AvatarImage src={LogoImg} />
                <AvatarFallback>Plausio</AvatarFallback>
              </Avatar>
              Plausio
            </Button>
          </Link>
        </div>

        <div className="border-t p-2">
          <Button
            onClick={logout}
            variant="ghost"
            className="h-11 w-full justify-start text-destructive hover:text-destructive"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default StudioProfile
