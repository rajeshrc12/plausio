import amqp from "amqplib"
import type { ConsumeMessage } from "amqplib"

import { env } from "@/config/env"

interface VideoJob {
  id: string
  type: string
}

export async function startConsumer() {
  const connection = await amqp.connect(env.RABBITMQ_URL)
  const channel = await connection.createChannel()

  await channel.assertQueue(env.RABBITMQ_VIDEO_QUEUE_NAME, {
    durable: true,
  })

  channel.consume(
    env.RABBITMQ_VIDEO_QUEUE_NAME,
    async (msg: ConsumeMessage | null) => {
      if (!msg) return

      try {
        const job = JSON.parse(msg.content.toString()) as VideoJob

        console.log("Received:", job)

        await processJob(job)

        channel.ack(msg)
      } catch (error) {
        console.error(error)

        channel.nack(msg, false, true)
      }
    },
    {
      noAck: false,
    }
  )

  console.log(`Waiting for messages on "${env.RABBITMQ_VIDEO_QUEUE_NAME}"`)
}

async function processJob(job: VideoJob) {
  console.log("Processing:", job)

  // Your logic here

  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("Finished:", job.id)
}
