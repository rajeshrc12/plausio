import SignIn from "@/components/sign-in"
import SignOut from "@/components/sign-out"
import { useMyChannel } from "@/queries/channel"
import { getProfileUrl } from "@/utils/video"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

import { Settings } from "lucide-react"
import { Link } from "react-router"

const AppProfile = () => {
  const { data: myChannel, isError } = useMyChannel()
  if (isError) return <SignIn />
  if (myChannel?.id)
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
              <p className="truncate text-muted-foreground">
                {myChannel.email}
              </p>
              <Link to={`/@${myChannel.handle}`}>
                <Button variant={"link"} className="mt-1 h-auto p-0">
                  View your channel
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-2">
            <Link to="/studio">
              <Button variant="ghost" className="h-11 w-full justify-start">
                <Settings className="mr-3 h-5 w-5" />
                Studio
              </Button>
            </Link>
          </div>

          <div className="border-t p-2">
            <SignOut />
          </div>
        </PopoverContent>
      </Popover>
    )
  return <Skeleton className="h-9 w-9 rounded-full" />
}

export default AppProfile
