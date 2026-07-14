import amqp from "amqplib"
import type { ConsumeMessage } from "amqplib"

import { env } from "@/config/env"
import { createVideoResolution } from "@/services/video"

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
        const job = JSON.parse(msg.content.toString())

        console.log("Received:", job)

        await createVideoResolution(job)

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
