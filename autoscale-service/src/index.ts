import { env } from "./config/env.js";
import { spinUp } from "./services/ecs.js";
import { getQueueStats } from "./services/rabbitmq.js";

async function poll() {
  try {
    const stats = await getQueueStats();

    console.log("RabbitMQ:", stats);
    const workersToStart = Math.min(stats.ready, env.MAX_FARGATE_WORKERS);
    console.log(workersToStart);
    const result = await spinUp(workersToStart);

    console.log(result.tasks.map((task) => task.taskArn));
    // Autoscaling logic will go here.
  } catch (error) {
    console.error("RabbitMQ polling failed:", error);
  } finally {
    setTimeout(poll, env.POLL_INTERVAL_MS);
  }
}
poll();
