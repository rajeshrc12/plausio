import dotenv from "dotenv";

dotenv.config();

export const env = {
  AWS_REGION: process.env.AWS_REGION!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET!,
  AWS_S3_BUCKET_VIDEO_PATH: process.env.AWS_S3_BUCKET_VIDEO_PATH!,
  AWS_SQS_URL: process.env.AWS_SQS_URL!,

  UPLOAD_SERVICE_API_URL: process.env.UPLOAD_SERVICE_API_URL!,
  POLL_INTERVAL_MS: 5_000,

  BULLMQ_QUEUE: process.env.BULLMQ_QUEUE!,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,

  ECS_CLUSTER: process.env.ECS_CLUSTER!,
  ECS_TASK_DEFINITION: process.env.ECS_TASK_DEFINITION!,
  ECS_SUBNET_IDS: process.env.ECS_SUBNET_IDS!.split(",").map((id) => id.trim()),
  ECS_SECURITY_GROUP_IDS: process.env
    .ECS_SECURITY_GROUP_IDS!.split(",")
    .map((id) => id.trim()),
  ECS_ASSIGN_PUBLIC_IP: process.env.ECS_ASSIGN_PUBLIC_IP! as
    | "ENABLED"
    | "DISABLED",
  ECS_CONTAINER_NAME: process.env.ECS_CONTAINER_NAME!,

  MAX_FARGATE_WORKERS: Number(process.env.MAX_FARGATE_WORKERS!),
};
