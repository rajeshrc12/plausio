-- DropIndex
DROP INDEX "Video_s3Key_key";

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "s3Key" DROP NOT NULL;
