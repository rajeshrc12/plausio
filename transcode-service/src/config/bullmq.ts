import { env } from "./env.js";

export const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
};
