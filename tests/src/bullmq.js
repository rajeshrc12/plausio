import { bullmq } from "./config/bullmq.js";

const addJobs = async (count) => {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error("Job count must be a positive integer");
  }

  for (let i = 0; i < count; i++) {
    const job = await bullmq.add("transcode", {
      id: Math.floor(Math.random() * 1000),
      type: "video/mp4",
    });

    console.log("Added job:", job.id);
  }

  const jobs = await bullmq.getJobs([
    "waiting",
    "active",
    "completed",
    "failed",
    "delayed",
  ]);

  const jobsWithStatus = await Promise.all(
    jobs.map(async (job) => ({
      id: job.id,
      data: job.data,
      status: await job.getState(),
    })),
  );

  console.log(jobsWithStatus);
};

const count = Number(process.argv[2] ?? 1);

addJobs(count);
