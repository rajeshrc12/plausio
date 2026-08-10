import amqp from "amqplib";
import { env } from "./config/env.js";
import { processVideo } from "./services/video.js";

async function main() {
  const connection = await amqp.connect(env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(env.RABBITMQ_QUEUE_NAME, {
    durable: true,
  });

  await channel.prefetch(1);

  console.log(`Worker listening on "${env.RABBITMQ_QUEUE_NAME}"`);

  await channel.consume(env.RABBITMQ_QUEUE_NAME, async (msg) => {
    if (!msg) return;

    try {
      const message = JSON.parse(msg.content.toString());

      await processVideo(message);

      channel.ack(msg);
    } catch (error) {
      console.error("Failed to process message:", error);

      // Requeue the message.
      channel.nack(msg, false, true);
    }
  });
}

main().catch((error) => {
  console.error("Worker failed:", error);
  process.exit(1);
});
