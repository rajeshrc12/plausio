import {
  ECSClient,
  RunTaskCommand,
  StopTaskCommand,
} from "@aws-sdk/client-ecs";

import { env } from "../config/env.js";
import {
  addCpuContainer,
  getCpuContainers,
  removeCpuContainer,
} from "./container.js";

const ecs = new ECSClient({
  region: env.AWS_REGION,
});

export async function spinUp(count = 1) {
  if (count < 1) {
    throw new Error("count must be at least 1");
  }

  const availableCapacity =
    env.MAX_FARGATE_WORKERS - (await getCpuContainers()).length;

  if (availableCapacity <= 0) {
    console.log("max worker capacity reached");

    return {
      tasks: [],
      failures: [],
    };
  }

  const actualCount = Math.min(count, availableCapacity);

  const command = new RunTaskCommand({
    cluster: env.ECS_CLUSTER,
    taskDefinition: env.ECS_TASK_DEFINITION,
    launchType: "FARGATE",
    count: actualCount,

    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: env.ECS_SUBNET_IDS,
        securityGroups: env.ECS_SECURITY_GROUP_IDS,
        assignPublicIp: env.ECS_ASSIGN_PUBLIC_IP,
      },
    },
  });

  const result = await ecs.send(command);

  if (result.failures?.length) {
    console.error("ECS failures:", result.failures);
  }

  const tasks = result.tasks ?? [];

  // Register successfully started tasks as "starting".
  //
  // Don't mark them as idle yet. The worker should change its
  // status to idle once it has actually connected and is ready.
  await Promise.all(
    tasks.map(async (task) => {
      const taskArn = task.taskArn;

      if (!taskArn) {
        return;
      }

      const id = taskArn.split("/").pop();

      if (!id) {
        return;
      }

      await addCpuContainer({
        id,
        status: "starting",
        idleSince: null,
      });
    }),
  );

  return {
    tasks,
    failures: result.failures ?? [],
  };
}

export async function spinDown(count = 0) {
  if (count < 1) {
    return [];
  }

  const containers = await getCpuContainers();

  const now = Date.now();
  const idleContainers = containers.filter((container) => {
    if (container.status !== "idle" || !container.idleSince) {
      return false;
    }

    const idleSince = new Date(container.idleSince).getTime();

    return now - idleSince > env.TASK_IDLE_TIME_IN_MINUTES;
  });

  if (idleContainers.length === 0) {
    console.log("no idle workers available to stop");
    return [];
  }

  const containersToStop = idleContainers.slice(0, count);

  console.log("stopping idle workers", {
    requested: count,
    available: idleContainers.length,
    stopping: containersToStop.length,
    ids: containersToStop.map((container) => container.id),
  });

  const results = await Promise.allSettled(
    containersToStop.map(({ id }) =>
      ecs.send(
        new StopTaskCommand({
          cluster: env.ECS_CLUSTER_ARN,
          task: id,
          reason: "Stopping idle CPU container",
        }),
      ),
    ),
  );

  const stoppedIds: string[] = [];

  results.forEach((result, index) => {
    const id = containersToStop[index].id;

    if (result.status === "fulfilled") {
      stoppedIds.push(id);
      return;
    }

    console.error("failed to stop ECS task", {
      id,
      error: result.reason,
    });
  });

  // Only remove workers from our registry when ECS successfully
  // accepted the stop request.
  await Promise.all(stoppedIds.map((id) => removeCpuContainer(id)));

  return stoppedIds;
}
