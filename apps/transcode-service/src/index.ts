import app from "@/app"
import { env } from "@/config/env"
import { startConsumer } from "@/config/rabbitmq"

async function bootstrap() {
  await startConsumer()

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`)
  })
}

bootstrap().catch((err) => {
  console.error(err)
  process.exit(1)
})
