"use server";

import { auth } from "@/lib/auth";
import { duplicateNews } from "@/lib/news";

import { revalidatePath } from "next/cache";

interface DuplicateNewsInput {
  id: string;
}

export async function duplicateNewsAction({
  id,
}: DuplicateNewsInput) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const role = session.user.role;

  if (
    role !== "ADMIN" &&
    role !== "EDITOR"
  ) {
    throw new Error(
      "You are not allowed to duplicate news."
    );
  }

  const duplicate = await duplicateNews(id);

  revalidatePath("/");
  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/reporter/news");

  return {
    success: true,
    id: duplicate.id,
  };
}