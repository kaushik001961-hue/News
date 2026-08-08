"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteAdvertisement(
  id: string
) {
  await prisma.advertisement.delete({
    where: { id },
  });

  revalidatePath("/admin/ads");
}