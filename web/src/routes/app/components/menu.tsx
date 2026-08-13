import { signIn } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { useMe } from "@/queries/user"
import { MenuIcon, PersonStanding } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from "react-router"
const Menu = () => {
  const { data } = useMe()
  console.log(data)
  if (data?.id)
    return (
      <Popover>
        <PopoverTrigger>
          <MenuIcon />
        </PopoverTrigger>

        <PopoverContent align="end" className="w-60 p-0">
          <div className="px-2">
            <Link to="/my-account">
              <Button variant="ghost" className="h-11 w-full justify-start">
                <PersonStanding className="mr-3 h-5 w-5" />
                My Account
              </Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    )
  return (
    <Button onClick={signIn} variant={"ghost"}>
      Login
    </Button>
  )
}

export default Menu
