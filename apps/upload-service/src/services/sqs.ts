import { env } from "@/config/env"
import { sqs } from "@/config/sqs"
import { SendMessageCommand } from "@aws-sdk/client-sqs"

type Message = {
  id: number
  type: string
  key: string
}
export const addS3UrlToSQS = async (message: Message) => {
  const command = new SendMessageCommand({
    QueueUrl: env.AWS_SQS_URL,
    MessageBody: JSON.stringify(message),
  })

  const response = await sqs.send(command)

  console.log("Message sent:", response.MessageId)
}
