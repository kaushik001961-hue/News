"use server";

import { auth } from "@/lib/auth";
import {
  approveNews,
  rejectNews,
} from "@/lib/news/mutations";
import { revalidatePath } from "next/cache";

interface ReviewNewsInput {
  id: string;

  action: "approve" | "reject";

  reason?: string;
}

export async function reviewNewsAction({
  id,
  action,
  reason,
}: ReviewNewsInput) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Only EDITOR can review news
  if (session.user.role !== "EDITOR") {
    throw new Error(
      "Only Editors can review news."
    );
  }

  switch (action) {
    case "approve":
      await approveNews(
        id,
        session.user.id
      );
      break;

    case "reject":
      await rejectNews(
        id,
        session.user.id,
        reason
      );
      break;

    default:
      throw new Error("Invalid action.");
  }

  revalidatePath("/");
  revalidatePath("/editor/news");
  revalidatePath("/admin/news");
  revalidatePath("/reporter/news");

  return {
    success: true,
    message:
      action === "approve"
        ? "News sent for Admin approval successfully."
        : "News rejected successfully.",
  };
}