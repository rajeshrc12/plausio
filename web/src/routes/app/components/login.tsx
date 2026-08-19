import { signIn } from "@/api/auth"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useLogin from "@/hooks/use-login"
import { LockKeyhole } from "lucide-react"

const Login = () => {
  const { dialog, setDialog } = useLogin()

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full">
            <LockKeyhole className="h-5 w-5 text-muted-foreground" />
          </div>

          <DialogTitle className="text-lg font-semibold">
            Login to Watch
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Sign in to continue watching.
          </DialogDescription>
        </DialogHeader>

        <Button onClick={signIn} className="mt-2 h-11 w-full font-medium">
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default Login
