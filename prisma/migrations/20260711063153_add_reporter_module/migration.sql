-- CreateEnum
CREATE TYPE "ReporterStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PHOTO', 'AADHAAR', 'PAN', 'RESUME', 'CERTIFICATE', 'POLICE_VERIFICATION', 'OTHER');

-- CreateTable
CREATE TABLE "Reporter" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT,
    "applicationNo" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "photo" TEXT,
    "gender" TEXT,
    "dob" TIMESTAMP(3),
    "fatherName" TEXT,
    "motherName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "aadhaarNumber" TEXT,
    "panNumber" TEXT,
    "qualification" TEXT,
    "institute" TEXT,
    "passingYear" INTEGER,
    "experienceYears" INTEGER,
    "previousOrganization" TEXT,
    "designation" TEXT,
    "reporterType" TEXT,
    "bureau" TEXT,
    "beat" TEXT,
    "coverageArea" TEXT,
    "hasCamera" BOOLEAN NOT NULL DEFAULT false,
    "hasLaptop" BOOLEAN NOT NULL DEFAULT false,
    "hasBike" BOOLEAN NOT NULL DEFAULT false,
    "hasCar" BOOLEAN NOT NULL DEFAULT false,
    "accountHolderName" TEXT,
    "accountNumber" TEXT,
    "ifsc" TEXT,
    "bankName" TEXT,
    "emergencyName" TEXT,
    "emergencyPhone" TEXT,
    "emergencyRelation" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "youtube" TEXT,
    "status" "ReporterStatus" NOT NULL DEFAULT 'PENDING',
    "approvedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReporterDocument" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "file" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReporterDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PressCard" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "qrCode" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PressCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reporter_reporterId_key" ON "Reporter"("reporterId");

-- CreateIndex
CREATE UNIQUE INDEX "Reporter_applicationNo_key" ON "Reporter"("applicationNo");

-- CreateIndex
CREATE UNIQUE INDEX "Reporter_email_key" ON "Reporter"("email");

-- CreateIndex
CREATE INDEX "ReporterDocument_reporterId_idx" ON "ReporterDocument"("reporterId");

-- CreateIndex
CREATE UNIQUE INDEX "PressCard_reporterId_key" ON "PressCard"("reporterId");

-- CreateIndex
CREATE UNIQUE INDEX "PressCard_cardNumber_key" ON "PressCard"("cardNumber");

-- AddForeignKey
ALTER TABLE "ReporterDocument" ADD CONSTRAINT "ReporterDocument_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "Reporter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressCard" ADD CONSTRAINT "PressCard_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "Reporter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
