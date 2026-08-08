"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function unpublishNews(id: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (
    session.user.role !== "ADMIN" &&
    session.user.role !== "EDITOR"
  ) {
    throw new Error("Permission denied");
  }

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      status: "DRAFT",
      publishedAt: null,
    },
  });

  revalidatePath("/");

  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/reporter/news");
}