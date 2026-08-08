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

export type BulkMediaAction =
  | "delete";

interface BulkInput {
  ids: string[];
  action: BulkMediaAction;
}

export async function bulkMediaActions({
  ids,
  action,
}: BulkInput) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  switch (action) {
    case "delete": {
      const media = await prisma.media.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      for (const item of media) {
        if (item.publicId) {
          await cloudinary.uploader.destroy(
            item.publicId,
            {
              resource_type: "auto",
            }
          );
        }
      }

      await prisma.media.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      break;
    }
  }

  revalidatePath("/admin/media");
}