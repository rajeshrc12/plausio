import { env } from "./config/env.js";
import { getQueueStats } from "./services/rabbitmq.js";

async function poll() {
  try {
    const stats = await getQueueStats();

    console.log("RabbitMQ:", stats);

    // Autoscaling logic will go here.
  } catch (error) {
    console.error("RabbitMQ polling failed:", error);
  } finally {
    setTimeout(poll, env.POLL_INTERVAL_MS);
  }
}
poll();
