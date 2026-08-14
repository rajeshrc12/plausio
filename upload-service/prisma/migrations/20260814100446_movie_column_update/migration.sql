/*
  Warnings:

  - You are about to drop the column `filename` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `filesize` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "filename",
DROP COLUMN "filesize",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER NOT NULL;
