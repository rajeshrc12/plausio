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

const StudioProfile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-9 w-9">
          <AvatarImage src={""} />
          <AvatarFallback>{"RC"}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-60 p-0">
        {/* Header */}
        <div className="flex items-start gap-3 border-b p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://i.pravatar.cc/150?img=1`} />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">Rajesh Charhajari</p>
            <p className="truncate text-sm text-muted-foreground">
              rajesh@gmail.com
            </p>
          </div>
        </div>
        <div className="px-2">
          <Link to={"/channel"}>
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
