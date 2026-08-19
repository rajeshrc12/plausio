import { env } from "./config/env.js";
import { spinDown, spinUp } from "./services/ecs.js";
import { getQueueStats } from "./services/bullmq.js";
import { getCpuContainers } from "./services/container.js";

async function poll() {
  try {
    const [stats, containers] = await Promise.all([
      getQueueStats(),
      getCpuContainers(),
    ]);

    const readyJobs = stats.ready;
    const runningWorkers = containers.length;

    const maxWorkers = env.MAX_FARGATE_WORKERS;
    const jobsPerWorker = env.TASKS_PER_WORKER;

    const requiredWorkers =
      readyJobs > 0 ? Math.ceil(readyJobs / jobsPerWorker) : 0;

    const desiredWorkers = Math.min(requiredWorkers, maxWorkers);

    const delta = desiredWorkers - runningWorkers;

    // Scale up.
    if (delta > 0) {
      const count = Math.min(delta, maxWorkers - runningWorkers);

      console.log("spinning up tasks", {
        count,
        readyJobs,
        runningWorkers,
        desiredWorkers,
      });

      const result = await spinUp(count);

      console.log(
        "started tasks",
        result.tasks.map((task) => task.taskArn),
      );

      if (result.failures.length > 0) {
        console.error("ECS task failures", result.failures);
      }

      return {
        action: "scale_up",
        count: result.tasks.length,
        desiredWorkers,
        runningWorkers,
        readyJobs,
      };
    }

    // Scale down.
    if (delta < 0) {
      const count = Math.abs(delta);

      console.log("spinning down tasks", {
        count,
        readyJobs,
        runningWorkers,
        desiredWorkers,
      });

      const stopped = await spinDown(count);

      console.log("stopped tasks", stopped);

      return {
        action: "scale_down",
        count: stopped.length,
        desiredWorkers,
        runningWorkers,
        readyJobs,
      };
    }

    console.log("no scaling action", {
      readyJobs,
      runningWorkers,
      desiredWorkers,
    });

    return {
      action: "none",
      count: 0,
      desiredWorkers,
      runningWorkers,
      readyJobs,
    };
  } catch (error) {
    console.error("BullMQ polling failed:", error);
  } finally {
    setTimeout(poll, env.POLL_INTERVAL_MS);
  }
}
poll();
