import https from "node:https"
import { S3Client } from "@aws-sdk/client-s3"
import { NodeHttpHandler } from "@smithy/node-http-handler"
import { env } from "@/config/env"

export const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  requestHandler: new NodeHttpHandler({
    httpsAgent: new https.Agent({
      keepAlive: true,
      maxSockets: 20,
    }),
  }),
})
