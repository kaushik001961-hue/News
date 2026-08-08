/*
  Warnings:

  - A unique constraint covering the columns `[applicationNo]` on the table `Reporter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationNo` to the `Reporter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reporter" ADD COLUMN     "applicationNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reporter_applicationNo_key" ON "Reporter"("applicationNo");
