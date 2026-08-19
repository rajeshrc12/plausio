import { login } from "@/api/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const AdminLogin = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const handleLogin = async () => {
    const admin = await login({ userName, password })
    if (admin) {
      window.location.href = "/dashboard"
      return
    }
    setError("Invalid username or password")

    console.log("handleLogin", admin)
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-80 flex-col gap-5 rounded border p-5 shadow">
        <div className="text-xl font-bold">Admin Login</div>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter username"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter password"
        />
        {error && <span className="text-destructive">{error}</span>}
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  )
}

export default AdminLogin
