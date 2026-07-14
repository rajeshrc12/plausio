import { env } from "@/config/env"
import { getChannel } from "@/config/rabbitmq"

export const createVideoJob = ({ id, type }: { id: string; type: string }) => {
  const channel = getChannel()

  const job = {
    id,
    type,
  }

  channel.sendToQueue(
    env.RABBITMQ_VIDEO_QUEUE_NAME,
    Buffer.from(JSON.stringify(job)),
    {
      persistent: true,
    }
  )

  console.log("Job queued")
}
