import amqp from "amqplib";
import { env } from "./config/env.js";

async function main() {
  const queueUrl = env.RABBITMQ_URL;
  const queueName = env.RABBITMQ_QUEUE_NAME;
  const jobCount = 5;

  const connection = await amqp.connect(queueUrl);
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, {
    durable: true,
  });

  for (let i = 1; i <= jobCount; i++) {
    const job = {
      id: i,
      type: "test",
      createdAt: new Date().toISOString(),
    };

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(job)), {
      persistent: true,
    });
  }

  console.log(`Added ${jobCount} jobs to "${queueName}"`);

  await channel.close();
  await connection.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
