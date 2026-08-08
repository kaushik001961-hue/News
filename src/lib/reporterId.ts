import { prisma } from "@/lib/prisma";

export async function generateReporterId() {
  const count = await prisma.reporter.count();

  const nextNumber = count + 1;

  return `AGS-RPT-${nextNumber
    .toString()
    .padStart(6, "0")}`;
}