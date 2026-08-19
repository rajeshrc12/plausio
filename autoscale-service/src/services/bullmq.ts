import { bullmq } from "../config/bullmq.js";

export interface QueueStats {
  ready: number;
  unacknowledged: number;
  total: number;
  consumers: number;
}

export async function getQueueStats(): Promise<QueueStats> {
  const counts = await bullmq.getJobCounts(
    "waiting",
    "active",
    "delayed",
    "completed",
    "failed",
  );

  const ready = counts.waiting;
  const unacknowledged = counts.active;
  const total = counts.waiting + counts.active + counts.delayed;

  const workers = await bullmq.getWorkers();

  return {
    ready,
    unacknowledged,
    total,
    consumers: workers.length,
  };
}
