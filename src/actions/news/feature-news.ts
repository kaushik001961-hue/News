"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleFeatured(
  id: string
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { featured: true },
  });

  if (!post) {
    throw new Error("News not found");
  }

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      featured: !post.featured,
    },
  });

  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/");

  return {
    success: true,
  };
}