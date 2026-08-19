import dotenv from "dotenv";

dotenv.config();

export const env = {
  BULLMQ_QUEUE: process.env.BULLMQ_QUEUE,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
};
