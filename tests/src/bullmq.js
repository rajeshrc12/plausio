import { bullmq } from "./config/bullmq.js";

const addJob = async () => {
  const job = await bullmq.add("transcode", {
    id: Math.floor(Math.random() * 1000),
    type: "video/mp4",
  });

  console.log("Added job:", job.id);

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
      name: job.name,
      data: job.data,
      status: await job.getState(),
    })),
  );

  console.log(jobsWithStatus);
};

addJob();
