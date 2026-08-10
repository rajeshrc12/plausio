import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { env } from "./config/env.js";
import { sqs } from "./config/sqs.js";

const addS3UrlToSQS = async (message) => {
  const command = new SendMessageCommand({
    QueueUrl: env.AWS_SQS_URL,
    MessageBody: JSON.stringify(message),
  });

  const response = await sqs.send(command);

  console.log("Message sent:", response.MessageId);
};

const messages = [
  { id: 1, type: "video/mp4" },
  { id: 12, type: "video/mp4" },
  { id: 13, type: "video/mp4" },
  { id: 14, type: "video/mp4" },
  { id: 15, type: "video/mp4" },
];

await Promise.all(messages.map((message) => addS3UrlToSQS(message)));
