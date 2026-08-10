import axios from "axios";
import { env } from "../config/env.js";

export interface QueueStats {
  ready: number;
  unacknowledged: number;
  total: number;
  consumers: number;
}

export async function getQueueStats(): Promise<QueueStats> {
  const queueUrl =
    `${env.RABBITMQ_MANAGEMENT_URL}/api/queues/%2F/` +
    encodeURIComponent(env.RABBITMQ_QUEUE_NAME);

  const response = await axios.get(queueUrl, {
    auth: {
      username: env.RABBITMQ_USERNAME,
      password: env.RABBITMQ_PASSWORD,
    },
    timeout: 3_000,
  });

  const queue = response.data;

  return {
    ready: queue.messages_ready,
    unacknowledged: queue.messages_unacknowledged,
    total: queue.messages,
    consumers: queue.consumers,
  };
}
