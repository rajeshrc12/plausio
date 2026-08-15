import { env } from "../config/env.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3.js";

interface createS3UrlProps {
  key: string;
  contentType: string;
  expireTimeInMinutes: number;
}
export const createS3Url = async ({
  key,
  contentType,
  expireTimeInMinutes,
}: createS3UrlProps) => {
  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType || "application/octet-stream",
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: expireTimeInMinutes * 60,
  });
  return uploadUrl;
};
