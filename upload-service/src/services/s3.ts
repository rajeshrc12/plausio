import { env } from "../config/env.js";
import { s3 } from "../config/s3.js";
import { getProfileKey } from "../utils/s3.js";
import {
  CompleteMultipartUploadCommand,
  CompleteMultipartUploadCommandOutput,
  CreateMultipartUploadCommand,
  CompletedPart,
  UploadPartCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface CreateMultipartUploadIdParams {
  key: string;
  contentType: string;
}

export const createMultipartUploadId = async ({
  key,
  contentType,
}: CreateMultipartUploadIdParams): Promise<string | undefined> => {
  const { UploadId } = await s3.send(
    new CreateMultipartUploadCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key,
      ContentType: contentType,
    }),
  );

  return UploadId;
};

interface CreateMultipartUploadUrlsParams {
  totalParts?: number;
  uploadId: string;
  key: string;
}

interface MultipartUploadUrl {
  partNumber: number;
  url: string;
}

export const createMultipartUploadUrls = async ({
  totalParts = 1,
  uploadId,
  key,
}: CreateMultipartUploadUrlsParams): Promise<MultipartUploadUrl[]> => {
  const urls = await Promise.all(
    Array.from({ length: totalParts }, async (_, index) => {
      const partNumber = index + 1;

      const command = new UploadPartCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: key,
        UploadId: uploadId,
        PartNumber: partNumber,
      });

      const url = await getSignedUrl(s3, command, {
        expiresIn: 3600,
      });

      return {
        partNumber,
        url,
      };
    }),
  );

  return urls;
};

interface CompleteMultipartUploadParams {
  key: string;
  uploadId: string;
  parts: CompletedPart[];
}

export const completeMultipartUpload = async ({
  key,
  uploadId,
  parts,
}: CompleteMultipartUploadParams): Promise<CompleteMultipartUploadCommandOutput> => {
  const result = await s3.send(
    new CompleteMultipartUploadCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    }),
  );

  return result;
};

export const createPresignedUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
  });

  return await getSignedUrl(s3, command, {
    expiresIn: 60 * 60, // 1 hour
  });
};
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
