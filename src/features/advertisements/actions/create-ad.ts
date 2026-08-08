"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAdvertisement(
  formData: FormData
) {
  const title = String(formData.get("title"));
  const slug = String(formData.get("slug"));

  const image =
    String(formData.get("image")) || null;

  const targetUrl =
    String(formData.get("targetUrl")) || null;

  const htmlCode =
    String(formData.get("htmlCode")) || null;

  const position = formData.get(
    "position"
  ) as any;

  const device = formData.get(
    "device"
  ) as any;

  const priority = Number(
    formData.get("priority")
  );

  const active =
    formData.get("active") === "true";

  await prisma.advertisement.create({
    data: {
      title,
      slug,
      image,
      targetUrl,
      htmlCode,
      position,
      device,
      priority,
      active,
    },
  });

  revalidatePath("/admin/ads");

  redirect("/admin/ads");
}