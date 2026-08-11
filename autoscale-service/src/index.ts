import { env } from "./config/env.js";
// import { spinUp } from "./services/ecs.js";
import { getQueueStats } from "./services/bullmq.js";
import {
  addCpuContainer,
  clearCpuContainers,
  getCpuContainers,
} from "./services/container.js";

clearCpuContainers();

async function poll() {
  try {
    const stats = await getQueueStats();

    console.log("BullMQ:", stats);
    // const workersToStart = Math.min(stats.ready, env.MAX_FARGATE_WORKERS);
    // console.log(workersToStart);
    // const result = await spinUp(workersToStart);

    // console.log(JSON.stringify(result.tasks, null, 4));
    for (const task of new Array(stats.ready)) {
      await addCpuContainer({
        id: task?.taskArn?.split("/")[2] || Math.floor(Math.random() * 10000),
        status: "init",
      });
    }
    console.log(await getCpuContainers());
    // Autoscaling logic will go here.
  } catch (error) {
    console.error("BullMQ polling failed:", error);
  } finally {
    setTimeout(poll, env.POLL_INTERVAL_MS);
  }
}
poll();
