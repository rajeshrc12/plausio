/*
  Warnings:

  - Made the column `createdAt` on table `Thumbnail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Thumbnail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `visibility` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `likes` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dislikes` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `views` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Video` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Thumbnail" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "visibility" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "likes" SET NOT NULL,
ALTER COLUMN "dislikes" SET NOT NULL,
ALTER COLUMN "views" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
