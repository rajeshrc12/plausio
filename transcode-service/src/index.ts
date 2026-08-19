import { Worker } from "bullmq";
import { env } from "./config/env.js";
import { connection } from "./config/bullmq.js";
import { processVideo } from "./services/video.js";

const worker = new Worker(env.BULLMQ_QUEUE, processVideo, { connection });

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});
