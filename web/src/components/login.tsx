import { env } from "@/config/env"
import { useEffect, useRef } from "react"

export default function Login() {
  const buttonRef = useRef(null)

  useEffect(() => {
    const waitForGoogle = setInterval(() => {
      if (!window.google) return

      clearInterval(waitForGoogle)

      window.google.accounts.id.initialize({
        client_id: env.GOOGLE_CLIENT_ID,

        callback: async (response: any) => {
          const res = await fetch("http://localhost:8000/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              credential: response.credential,
            }),
          })

          const data = await res.json()

          if (!res.ok) {
            console.error(data)
            return
          }

          console.log("Logged in:", data)
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
