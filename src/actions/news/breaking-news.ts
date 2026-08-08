"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleBreaking(
  id: string
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { breaking: true },
  });

  if (!post) {
    throw new Error("News not found");
  }

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      breaking: !post.breaking,
    },
  });

  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/");

  return {
    success: true,
  };
}