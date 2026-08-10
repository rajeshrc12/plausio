import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";

import { env } from "../config/env.js";

const ecs = new ECSClient({
  region: env.AWS_REGION,
});

export async function spinUp(count = 1) {
  if (count < 1) {
    throw new Error("count must be at least 1");
  }

  const command = new RunTaskCommand({
    cluster: env.ECS_CLUSTER,
    taskDefinition: env.ECS_TASK_DEFINITION,
    launchType: "FARGATE",
    count,

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

  return {
    tasks: result.tasks ?? [],
    failures: result.failures ?? [],
  };
}
