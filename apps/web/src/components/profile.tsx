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
import { useNavigate } from "react-router"

const Profile = () => {
  const { data, isLoading } = {
    data: {
      name: "Rajesh Charhajari",
      image: "",
      email: "rajesh@gmail.com",
    },
    isLoading: false,
  }

  const navigate = useNavigate()

  const initials =
    data?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "U"

  const logout = () => {
    navigate("/", { replace: true })
  }

  if (isLoading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-0 hover:bg-muted"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={data?.image} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        {/* Header */}
        <div className="flex items-start gap-3 border-b p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={data?.image} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{data?.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {data?.email}
            </p>

            <Button variant="link" className="mt-1 h-auto p-0 text-sm">
              View your channel
            </Button>
          </div>
        </div>

        {/* Menu */}
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
            variant="ghost"
            onClick={logout}
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

export default Profile
