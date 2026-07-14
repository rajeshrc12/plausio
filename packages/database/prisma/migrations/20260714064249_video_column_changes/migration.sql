/*
  Warnings:

  - The `visibility` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "visibility",
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'public',
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';
