"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteMedia(id: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  const media = await prisma.media.findUnique({
    where: { id },
  });

  if (!media) {
    throw new Error("Media not found.");
  }

  if (media.publicId) {
    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: "auto",
    });
  }

  await prisma.media.delete({
    where: { id },
  });

  revalidatePath("/admin/media");

  return {
    success: true,
  };
}