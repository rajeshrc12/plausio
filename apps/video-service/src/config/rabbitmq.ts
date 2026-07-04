import amqp, { Channel, ChannelModel } from "amqplib"
import { env } from "@/config/env"

let connection: ChannelModel
let channel: Channel

export async function connectRabbitMQ() {
  connection = await amqp.connect(env.RABBITMQ_URL)
  channel = await connection.createChannel()

  await channel.assertQueue(env.RABBITMQ_VIDEO_QUEUE_NAME, {
    durable: true,
  })

  console.log("✅ RabbitMQ connected")
}

export function getChannel() {
  if (!channel) {
    throw new Error("RabbitMQ not connected")
  }

  return channel
}

export async function closeRabbitMQ() {
  await channel?.close()
  await connection?.close()
}
