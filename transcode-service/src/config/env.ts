import dotenv from "dotenv";

dotenv.config();

export const env = {
  AWS_REGION: process.env.AWS_REGION!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET!,
  AWS_S3_BUCKET_VIDEO_PATH: process.env.AWS_S3_BUCKET_VIDEO_PATH!,

  UPLOAD_SERVICE_API_URL: process.env.UPLOAD_SERVICE_API_URL!,

  BULLMQ_QUEUE: process.env.BULLMQ_QUEUE!,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
};
