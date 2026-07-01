/*
  Warnings:

  - A unique constraint covering the columns `[s3Key]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `s3Key` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('INITIATED', 'UPLOADING', 'UPLOADED', 'PROCESSING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "s3Key" TEXT NOT NULL,
ADD COLUMN     "status" "VideoStatus" NOT NULL DEFAULT 'INITIATED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Video_s3Key_key" ON "Video"("s3Key");
