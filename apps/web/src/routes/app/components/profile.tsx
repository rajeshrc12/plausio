import channelApi from "@/api/channel"
import { env } from "@/config/env"
import { useMyChannel } from "@/hooks/useMyChannel"
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

import { LogOut, Settings } from "lucide-react"
import { Link, useNavigate } from "react-router"

const AppProfile = () => {
  const navigate = useNavigate()
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
  const login = () => {
    window.location.href = `${env.UPLOAD_API_URL}/auth/google`
  }

  if (isLoading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
  }

  if (!isLoading && !channel) return <Button onClick={login}>Sign in</Button>
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
            <AvatarImage src={`https://i.pravatar.cc/150?img=1`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{channel.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {channel.email}
            </p>
            <Link to={`/@${channel.handle}`}>
              <Button variant={"link"} className="mt-1 h-auto p-0 text-sm">
                View your channel
              </Button>
            </Link>
          </div>
        </div>

        <div className="px-2">
          <Button
            onClick={() => navigate("/studio")}
            variant="ghost"
            className="h-11 w-full justify-start"
          >
            <Settings className="mr-3 h-5 w-5" />
            Studio
          </Button>
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

export default AppProfile
