import app from "@/app"
import { env } from "@/config/env"
import { sqs } from "@/config/sqs"
import { SqsConsumer } from "@/services/sqs"
import { TranscodeHandler, TranscodeMessage } from "@/services/video"

import { Server } from "http"

async function bootstrap() {
  const handler = new TranscodeHandler()

  const consumer = new SqsConsumer<TranscodeMessage>(sqs, env.AWS_SQS_URL)

  consumer.start((message) => handler.handle(message))

  const server: Server = app.listen(env.PORT, () => {
    console.log(`Transcode service running on ${env.PORT}`)
  })

  const shutdown = async () => {
    console.log("Shutting down...")

    consumer.stop()

    server.close(() => {
      console.log("HTTP server closed")
      process.exit(0)
    })
  }

  process.on("SIGINT", shutdown)
  process.on("SIGTERM", shutdown)
}

bootstrap().catch((err) => {
  console.error(err)
  process.exit(1)
})
