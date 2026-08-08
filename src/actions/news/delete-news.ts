"use server";

import { auth } from "@/lib/auth";

import { deleteNews } from "@/lib/news/mutations";

import { revalidatePath } from "next/cache";

interface DeleteNewsInput {
  id: string;
}

export async function deleteNewsAction({
  id,
}: DeleteNewsInput) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const role = session.user.role;

  // Reporter cannot delete news
  if (
    role !== "ADMIN" &&
    role !== "EDITOR"
  ) {
    throw new Error(
      "Permission denied."
    );
  }

  await deleteNews(id);

  revalidatePath("/");

  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/reporter/news");

  return {
    success: true,
    message: "News deleted successfully.",
  };
}