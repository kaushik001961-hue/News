/*
  Warnings:

  - You are about to drop the column `password` on the `Reporter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Reporter` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Reporter" DROP COLUMN "password",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Reporter_userId_key" ON "Reporter"("userId");

-- AddForeignKey
ALTER TABLE "Reporter" ADD CONSTRAINT "Reporter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
