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

const count = Number(process.argv[2]);

if (!Number.isInteger(count) || count <= 0) {
  console.error("Please provide a positive number. Example: node index.js 10");
  process.exit(1);
}

const messages = Array.from({ length: count }, (_, index) => ({
  id: index + 1,
  type: "video/mp4",
}));

await Promise.all(messages.map(addS3UrlToSQS));

console.log(`${count} messages sent successfully.`);
