/*
  Warnings:

  - You are about to drop the column `s3Key` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Video` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "s3Key",
DROP COLUMN "thumbnailUrl",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "thumbnailKey" TEXT,
ADD COLUMN     "videoKey" TEXT;
