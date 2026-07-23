import { signIn } from "@/api/auth"
import { Button } from "@/components/ui/button"

const SignIn = () => {
  return <Button onClick={signIn}>Sign In</Button>
}

export default SignIn
