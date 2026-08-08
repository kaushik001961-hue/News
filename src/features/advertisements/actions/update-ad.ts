"use server";

import { prisma } from "@/lib/prisma";

export async function updateAdvertisement(
  id: string,
  data: any
) {
  return prisma.advertisement.update({
    where: {
      id,
    },
    data,
  });
}