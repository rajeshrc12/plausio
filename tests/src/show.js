import { bullmq } from "./config/bullmq.js";
import { redis } from "./config/redis.js";

const displayData = async () => {
  // BullMQ queue contents
  const jobs = await bullmq.getJobs(
    ["waiting", "active", "completed", "failed", "delayed"],
    0,
    -1,
  );

  console.log("\n=== BullMQ Queue ===");

  if (jobs.length === 0) {
    console.log("Queue is empty");
  } else {
    for (const job of jobs) {
      console.log({
        id: job.id,
        name: job.name,
        state: await job.getState(),
        data: job.data,
      });
    }
  }

  // Redis CPU value
  console.log("\n=== Redis CPU ===");
  const cpu = await redis.hgetall("cpu");

  const cpuArray = Object.entries(cpu).map(([key, value]) => ({
    key,
    ...JSON.parse(value),
  }));

  console.log(cpuArray);
};

displayData()
  .catch(console.error)
  .finally(async () => {
    await redis.quit();
  });
