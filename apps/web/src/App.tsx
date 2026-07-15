import { Button } from "@workspace/ui/components/button"
import { env } from "@/config/env"

const App = () => {
  const login = () => {
    window.location.href = `${env.UPLOAD_API_URL}/auth/google`
  }
  return (
    <div>
      <Button onClick={login}>Login</Button>
    </div>
  )
}

export default App
