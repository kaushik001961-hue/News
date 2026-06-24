import { prisma } from "@/lib/prisma";
export async function getAdByPosition(position: string) {
  return prisma.advertisement.findFirst({
    where: {
      active: true,
      position: position as any,
    },
    orderBy: {
      priority: "asc",
    },
  });
}