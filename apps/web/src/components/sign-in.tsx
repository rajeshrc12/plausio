import { signIn } from "@/api/auth"
import { Button } from "@workspace/ui/components/button"

const SignIn = () => {
  return <Button onClick={signIn}>Sign In</Button>
}

export default SignIn
