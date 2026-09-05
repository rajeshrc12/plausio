import { env } from "@/config/env"
import axios from "axios"
import { useEffect, useRef } from "react"

export default function LoginButton() {
  const buttonRef = useRef(null)

  useEffect(() => {
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
            window.location.href = "/app"
            console.log("Logged in:", data)
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
  }, [])

  return <div ref={buttonRef} />
}
