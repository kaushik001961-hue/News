/*
  Warnings:

  - You are about to drop the column `accountHolderName` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `accountNumber` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `applicationNo` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `bureau` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `experienceYears` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `fatherName` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `hasBike` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `hasCar` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `ifsc` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `institute` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `Reporter` table. All the data in the column will be lost.
  - You are about to drop the column `reporterType` on the `Reporter` table. All the data in the column will be lost.
  - The `gender` column on the `Reporter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';
ALTER TYPE "Role" ADD VALUE 'BUREAU_CHIEF';
ALTER TYPE "Role" ADD VALUE 'SUB_EDITOR';
ALTER TYPE "Role" ADD VALUE 'ANCHOR';
ALTER TYPE "Role" ADD VALUE 'CAMERA_MAN';
ALTER TYPE "Role" ADD VALUE 'VIDEO_EDITOR';
ALTER TYPE "Role" ADD VALUE 'ADVERTISEMENT_MANAGER';

-- DropIndex
DROP INDEX "Reporter_applicationNo_key";

-- AlterTable
ALTER TABLE "Reporter" DROP COLUMN "accountHolderName",
DROP COLUMN "accountNumber",
DROP COLUMN "applicationNo",
DROP COLUMN "bankName",
DROP COLUMN "bureau",
DROP COLUMN "city",
DROP COLUMN "experienceYears",
DROP COLUMN "fatherName",
DROP COLUMN "hasBike",
DROP COLUMN "hasCar",
DROP COLUMN "ifsc",
DROP COLUMN "institute",
DROP COLUMN "motherName",
DROP COLUMN "reporterType",
ADD COLUMN     "aadhaar" TEXT,
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "alternatePhone" TEXT,
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "bloodGroup" "BloodGroup",
ADD COLUMN     "college" TEXT,
ADD COLUMN     "currentOrganization" TEXT,
ADD COLUMN     "drivingLicense" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "hasVehicle" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "journalismDegree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "languages" TEXT,
ADD COLUMN     "languagesKnown" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "maritalStatus" "MaritalStatus",
ADD COLUMN     "nationality" TEXT DEFAULT 'Indian',
ADD COLUMN     "pan" TEXT,
ADD COLUMN     "preferredLocation" TEXT,
ADD COLUMN     "pressCard" TEXT,
ADD COLUMN     "rejectReason" TEXT,
ADD COLUMN     "remarks" TEXT,
ADD COLUMN     "resume" TEXT,
ADD COLUMN     "taluka" TEXT,
ADD COLUMN     "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "termsAcceptedAt" TIMESTAMP(3),
ADD COLUMN     "university" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "village" TEXT,
ADD COLUMN     "website" TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender",
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "district" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "pincode" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Reporter_status_idx" ON "Reporter"("status");

-- CreateIndex
CREATE INDEX "Reporter_district_idx" ON "Reporter"("district");

-- CreateIndex
CREATE INDEX "Reporter_state_idx" ON "Reporter"("state");

-- CreateIndex
CREATE INDEX "Reporter_reporterId_idx" ON "Reporter"("reporterId");
