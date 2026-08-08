"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export async function deleteCategory(id: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  const category = await prisma.category.findUnique({
    where: {
      id,
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

  if (!category) {
    throw new Error("Category not found.");
  }

  // Prevent deleting if articles exist

  if (category._count.posts > 0) {
    throw new Error(
      `Cannot delete category. It contains ${category._count.posts} article(s).`
    );
  }

  // Prevent deleting if child categories exist

  if (category._count.children > 0) {
    throw new Error(
      `Cannot delete category. It contains ${category._count.children} child categor${
        category._count.children > 1 ? "ies" : "y"
      }.`
    );
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  revalidatePath("/news");

  return {
    success: true,
    message: "Category deleted successfully.",
  };
}