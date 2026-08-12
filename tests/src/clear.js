import { bullmq } from "./config/bullmq.js";
import { redis } from "./config/redis.js";

const clearData = async () => {
  await bullmq.obliterate({
    force: true,
  });
  await redis.del("cpu");
  console.log("BullMQ and Cpu cleared");
};

clearData();
