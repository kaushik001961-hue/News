"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export type BulkCategoryAction =
  | "activate"
  | "deactivate"
  | "delete";

interface BulkCategoryInput {
  ids: string[];
  action: BulkCategoryAction;
}

export async function bulkCategoryActions({
  ids,
  action,
}: BulkCategoryInput) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  if (ids.length === 0) {
    return;
  }

  switch (action) {
    case "activate":
      await prisma.category.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          active: true,
        },
      });
      break;

    case "deactivate":
      await prisma.category.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          active: false,
        },
      });
      break;

    case "delete":
      // Prevent deleting categories that contain posts or children
      const categories = await prisma.category.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        include: {
          _count: {
            select: {
              posts: true,
              children: true,
            },
          },
        },
      });

      const invalid = categories.find(
        (c) =>
          c._count.posts > 0 ||
          c._count.children > 0
      );

      if (invalid) {
        throw new Error(
          `Cannot delete "${invalid.name}". Remove its articles or child categories first.`
        );
      }

      await prisma.category.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      break;
  }

  revalidatePath("/admin/categories");
}