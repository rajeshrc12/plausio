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
import { Link } from "react-router"

const AppProfile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-9 w-9">
          <AvatarImage src="" />
          <AvatarFallback>RC</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-60 p-0">
        <div className="flex items-start gap-3 border-b p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate">rajesh</p>
            <p className="truncate text-muted-foreground">rajesh@gmail.com</p>
            <Link to={`/@rajesh`}>
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
          <Button
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
