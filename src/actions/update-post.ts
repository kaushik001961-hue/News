"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAdvertisement(
  id: string,
  formData: FormData
) {
  await prisma.advertisement.update({
    where: { id },
    data: {
      title: String(formData.get("title")),
      slug: String(formData.get("slug")),

      image:
        String(formData.get("image")) || null,

      targetUrl:
        String(formData.get("targetUrl")) || null,

      htmlCode:
        String(formData.get("htmlCode")) || null,

      position: formData.get("position") as any,

      device: formData.get("device") as any,

      priority: Number(
        formData.get("priority")
      ),

      active:
        formData.get("active") === "true",
    },
  });

  revalidatePath("/admin/ads");

  redirect("/admin/ads");
}