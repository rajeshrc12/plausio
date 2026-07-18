import app from "@/app"
import { env } from "@/config/env"

app.listen(env.PORT, () => {
  console.log(`Upload sevice running on ${env.PORT}`)
})
