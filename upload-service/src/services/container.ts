import { env } from "../config/env.js";
import { redis } from "../config/redis.js";

const KEY = env.REDIS_CONTAINER_KEY;

export interface CpuContainer {
  id: string;
  status: "init" | "idle" | "busy" | "error";
}

export async function addCpuContainer(container: CpuContainer): Promise<void> {
  await redis.hset(KEY, container.id, JSON.stringify(container));
}

export async function getCpuContainers(): Promise<CpuContainer[]> {
  const containers = await redis.hgetall(KEY);

  return Object.values(containers).map(
    (container) => JSON.parse(container) as CpuContainer,
  );
}

export async function getCpuContainer(
  id: string,
): Promise<CpuContainer | null> {
  const container = await redis.hget(KEY, id);

  if (!container) {
    return null;
  }

  return JSON.parse(container) as CpuContainer;
}

export async function updateCpuContainer(
  id: string,
  updates: Partial<Omit<CpuContainer, "id">>,
): Promise<CpuContainer | null> {
  const existing = await getCpuContainer(id);

  if (!existing) {
    return null;
  }

  const updated: CpuContainer = {
    ...existing,
    ...updates,
    id,
  };

  await redis.hset(KEY, id, JSON.stringify(updated));

  return updated;
}

export async function removeCpuContainer(id: string): Promise<boolean> {
  const result = await redis.hdel(KEY, id);

  return result === 1;
}

export async function hasCpuContainer(id: string): Promise<boolean> {
  const result = await redis.hexists(KEY, id);

  return result === 1;
}

export async function clearCpuContainers(): Promise<void> {
  await redis.del(KEY);
}
