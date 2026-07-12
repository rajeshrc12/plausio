/*
  Warnings:

  - You are about to drop the column `height` on the `Thumbnail` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Thumbnail` table. All the data in the column will be lost.
  - Added the required column `type` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thumbnail" DROP COLUMN "height",
DROP COLUMN "width",
ADD COLUMN     "type" TEXT NOT NULL;
