import { env } from "./config/env.js";

const POLL_INTERVAL_MS = 5_000;

async function getQueueStats() {
  const queueUrl = `${env.RABBITMQ_MANAGEMENT_URL}/api/queues/%2F/${encodeURIComponent(
    env.RABBITMQ_QUEUE_NAME,
  )}`;

  const credentials = Buffer.from(
    `${env.RABBITMQ_USERNAME}:${env.RABBITMQ_PASSWORD}`,
  ).toString("base64");

  const response = await fetch(queueUrl, {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    signal: AbortSignal.timeout(3_000),
  });

  if (!response.ok) {
    throw new Error(`RabbitMQ API returned ${response.status}`);
  }

  const queue = await response.json();

  return {
    ready: queue.messages_ready,
    unacknowledged: queue.messages_unacknowledged,
    total: queue.messages,
    consumers: queue.consumers,
  };
}

async function poll() {
  try {
    const stats = await getQueueStats();

    console.log("RabbitMQ:", stats);
  } catch (error) {
    console.error("RabbitMQ polling failed:", error);
  } finally {
    setTimeout(poll, POLL_INTERVAL_MS);
  }
}

poll();
