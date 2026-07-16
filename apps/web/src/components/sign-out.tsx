import { signOut } from "@/api/auth"
import { Button } from "@workspace/ui/components/button"
import { LogOut } from "lucide-react"

const SignOut = () => {
  return (
    <Button
      onClick={signOut}
      variant="ghost"
      className="h-11 w-full justify-start text-destructive hover:text-destructive"
    >
      <LogOut className="mr-3 h-5 w-5" />
      Sign out
    </Button>
  )
}

export default SignOut
