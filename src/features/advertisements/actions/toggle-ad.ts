"use server";

import { prisma } from "@/lib/prisma";

export async function toggleAdvertisement(
  id: string
) {
  const ad =
    await prisma.advertisement.findUnique({
      where: { id },
    });

  if (!ad) return;

  await prisma.advertisement.update({
    where: {
      id,
    },
    data: {
      active: !ad.active,
    },
  });
}