"use server";

import { auth } from "@/lib/auth";

import { publishNews } from "@/lib/news/mutations";

import { revalidatePath } from "next/cache";

interface PublishNewsInput {
  id: string;
}

export async function publishNewsAction({
  id,
}: PublishNewsInput) {
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

  await publishNews(
    id,
    session.user.id
  );

  revalidatePath("/");

  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/reporter/news");

  return {
    success: true,
    message: "News published successfully.",
  };
}