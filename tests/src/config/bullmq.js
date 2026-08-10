import { Queue } from "bullmq";
import { env } from "./env.js";

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
};

export const uploadQueue = new Queue(env.BULLMQ_QUEUE, {
  connection,
});
