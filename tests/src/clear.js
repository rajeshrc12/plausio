import { redis } from "./config/redis.js";

const clearData = async () => {
  const response = await redis.flushall();
  console.log(response);
};

clearData();
