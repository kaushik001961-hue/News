-- CreateEnum
CREATE TYPE "AdPosition" AS ENUM ('HEADER', 'HOME_TOP', 'HOME_MIDDLE', 'HOME_BOTTOM', 'SIDEBAR_TOP', 'SIDEBAR_MIDDLE', 'SIDEBAR_BOTTOM', 'ARTICLE_TOP', 'ARTICLE_MIDDLE', 'ARTICLE_BOTTOM', 'FOOTER');

-- CreateEnum
CREATE TYPE "AdDevice" AS ENUM ('MOBILE', 'DESKTOP', 'ALL');

-- CreateTable
CREATE TABLE "Advertisement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT,
    "htmlCode" TEXT,
    "targetUrl" TEXT,
    "position" "AdPosition" NOT NULL,
    "device" "AdDevice" NOT NULL DEFAULT 'ALL',
    "priority" INTEGER NOT NULL DEFAULT 1,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Advertisement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdImpression" (
    "id" TEXT NOT NULL,
    "advertisementId" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdImpression_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdClick" (
    "id" TEXT NOT NULL,
    "advertisementId" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Advertisement_slug_key" ON "Advertisement"("slug");

-- CreateIndex
CREATE INDEX "Advertisement_position_idx" ON "Advertisement"("position");

-- CreateIndex
CREATE INDEX "Advertisement_active_idx" ON "Advertisement"("active");

-- CreateIndex
CREATE INDEX "AdImpression_advertisementId_idx" ON "AdImpression"("advertisementId");

-- CreateIndex
CREATE INDEX "AdClick_advertisementId_idx" ON "AdClick"("advertisementId");

-- AddForeignKey
ALTER TABLE "AdImpression" ADD CONSTRAINT "AdImpression_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdClick" ADD CONSTRAINT "AdClick_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "Advertisement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
