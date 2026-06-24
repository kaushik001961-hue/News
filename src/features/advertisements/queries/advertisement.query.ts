import { prisma } from "@/lib/prisma";

export async function getAdvertisements() {
  return prisma.advertisement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAdvertisement(id: string) {
  return prisma.advertisement.findUnique({
    where: {
      id,
    },
  });
}