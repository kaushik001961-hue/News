"use server";

import { auth } from "@/lib/auth";
import { archiveNews } from "@/lib/news/mutations";

import { revalidatePath } from "next/cache";

interface ArchiveNewsInput {
  id: string;
}

export async function archiveNewsAction({
  id,
}: ArchiveNewsInput) {
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

  await archiveNews(id);

  revalidatePath("/");
  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/reporter/news");

  return {
    success: true,
    message: "News archived successfully.",
  };
}