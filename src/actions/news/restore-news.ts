"use server";

import { auth } from "@/lib/auth";
import { restoreNews } from "@/lib/news/mutations";

import { revalidatePath } from "next/cache";

interface RestoreNewsInput {
  id: string;
}

export async function restoreNewsAction({
  id,
}: RestoreNewsInput) {
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
      "Permission denied."
    );
  }

  await restoreNews(id);

  revalidatePath("/");
  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/reporter/news");

  return {
    success: true,
    message: "News restored successfully.",
  };
}