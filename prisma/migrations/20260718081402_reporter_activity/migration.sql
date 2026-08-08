-- CreateEnum
CREATE TYPE "ReporterActivityType" AS ENUM ('REGISTERED', 'PROFILE_UPDATED', 'APPROVED', 'REJECTED', 'BLOCKED', 'ACTIVATED', 'PRESS_CARD_GENERATED', 'DOCUMENT_UPLOADED', 'DOCUMENT_VERIFIED', 'LOGIN', 'NEWS_CREATED', 'NEWS_PUBLISHED', 'PASSWORD_CHANGED');

-- CreateTable
CREATE TABLE "ReporterActivity" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "action" "ReporterActivityType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "performedBy" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReporterActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReporterActivity_reporterId_idx" ON "ReporterActivity"("reporterId");

-- CreateIndex
CREATE INDEX "ReporterActivity_createdAt_idx" ON "ReporterActivity"("createdAt");

-- AddForeignKey
ALTER TABLE "ReporterActivity" ADD CONSTRAINT "ReporterActivity_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "Reporter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
