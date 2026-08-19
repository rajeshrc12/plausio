/*
  Warnings:

  - You are about to drop the `Thumbnail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `director` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starring` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_movieId_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT[],
ADD COLUMN     "publisher" TEXT NOT NULL,
ADD COLUMN     "starring" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Thumbnail";
