import { env } from "@/config/env"
import { s3 } from "@/config/s3"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const createPresignedUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
  })

  return await getSignedUrl(s3, command, {
    expiresIn: 60 * 60, // 1 hour
  })
}
