import { env } from "./config/env.js";
import { spinUp } from "./services/ecs.js";
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
    let containers = await getCpuContainers();
    if (containers.length === 0) {
      const result = await spinUp(1);
      for (const task of result.tasks) {
        await addCpuContainer({
          id: task?.taskArn?.split("/")[2] || "",
          status: "init",
        });
      }
    }
    containers = await getCpuContainers();
    console.log("containers", containers);
    // Autoscaling logic will go here.
  } catch (error) {
    console.error("BullMQ polling failed:", error);
  } finally {
    setTimeout(poll, env.POLL_INTERVAL_MS);
  }
}
poll();
