/*
  Warnings:

  - You are about to drop the column `excerpt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isBreaking` on the `Post` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "PostStatus" ADD VALUE 'APPROVED';

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "excerpt",
DROP COLUMN "isBreaking",
ADD COLUMN     "breaking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "talukaId" TEXT,
ADD COLUMN     "video" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'REPORTER';

-- CreateTable
CREATE TABLE "Taluka" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Taluka_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Taluka_slug_key" ON "Taluka"("slug");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_talukaId_fkey" FOREIGN KEY ("talukaId") REFERENCES "Taluka"("id") ON DELETE SET NULL ON UPDATE CASCADE;
