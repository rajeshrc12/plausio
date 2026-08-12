import { bullmq } from "../config/bullmq.js";

type Message = {
  id: number;
  type: string;
  key: string;
};
export const createJob = async (message: Message) => {
  const job = await bullmq.add("transcode", message);

  console.log("Job created:", job.data);
};
