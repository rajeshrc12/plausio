import app from "@/app"
import { env } from "@/config/env"
import { connectRabbitMQ, closeRabbitMQ } from "@/config/rabbitmq"

async function bootstrap() {
  try {
    await connectRabbitMQ()

    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running on ${env.PORT}`)
    })

    let shuttingDown = false

    async function shutdown() {
      if (shuttingDown) return
      shuttingDown = true

      console.log("Shutting down...")

      server.close(async () => {
        await closeRabbitMQ()
        process.exit(0)
      })
    }

    process.once("SIGINT", shutdown)
    process.once("SIGTERM", shutdown)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

bootstrap()
