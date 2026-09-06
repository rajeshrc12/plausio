import { Button } from "@/components/ui/button"
import { env } from "@/config/env"
import { useMe } from "@/queries/user"
import axios from "axios"
import { useEffect, useRef } from "react"

export default function LoginButton() {
  const buttonRef = useRef<HTMLDivElement>(null)
  const { isError, data } = useMe()

  const isLoggedIn = !!data && !isError

  useEffect(() => {
    // Don't initialize Google Login if user is already logged in
    if (isLoggedIn || !isError || !buttonRef.current) return

    const waitForGoogle = setInterval(() => {
      if (!window.google) return

      clearInterval(waitForGoogle)

      window.google.accounts.id.initialize({
        client_id: env.GOOGLE_CLIENT_ID,

        callback: async (response: any) => {
          try {
            const { data } = await axios.post(
              `${env.USER_API_URL}/auth/google`,
              {
                credential: response.credential,
              },
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )

            console.log("Logged in:", data)

            window.location.href = "/app"
          } catch (error: any) {
            console.error(error.response?.data || error)
          }
        },
      })

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
      })
    }, 50)

    return () => clearInterval(waitForGoogle)
  }, [isLoggedIn, isError])

  // Still loading useMe()
  if (!data && !isError) {
    return null
  }

  // Logged in
  if (isLoggedIn) {
    return (
      <Button
        variant={"outline"}
        onClick={() => (window.location.href = "/app")}
      >
        Go to App
      </Button>
    )
  }

  // Not logged in
  return <div ref={buttonRef} />
}
