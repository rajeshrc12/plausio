import { env } from "../config/env.js";
import { s3 } from "../config/s3.js";
import { getProfileKey } from "../utils/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadGoogleProfileImage = async ({
  id,
  url,
}: {
  id: number;
  url: string;
}) => {
  try {
    // Download image
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = getProfileKey({ id });

    // Upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      }),
    );
  } catch (err) {
    console.log(err);
  }
};
