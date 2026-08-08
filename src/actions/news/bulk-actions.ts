"use server";

import { auth } from "@/lib/auth";

import {
  bulkUpdateStatus,
  bulkFeature,
  bulkBreaking,
  bulkTrending,
  bulkDelete,
} from "@/lib/news/mutations";

import { revalidatePath } from "next/cache";
import { PostStatus } from "@prisma/client";

export interface BulkNewsActionInput {
  ids: string[];

  action:
    | "publish"
    | "draft"
    | "archive"
    | "restore"
    | "delete"
    | "feature"
    | "unfeature"
    | "breaking"
    | "unbreaking"
    | "trending"
    | "untrending";
}

export async function bulkNewsAction({
  ids,
  action,
}: BulkNewsActionInput) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!ids.length) {
    throw new Error("No news selected.");
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

  switch (action) {
    case "publish":
      await bulkUpdateStatus(
        ids,
        "PUBLISHED"
      );
      break;

    case "draft":
      await bulkUpdateStatus(
        ids,
        "DRAFT"
      );
      break;

    case "archive":
      await bulkUpdateStatus(
        ids,
        "ARCHIVED"
      );
      break;

    case "restore":
      await bulkUpdateStatus(
        ids,
        "DRAFT"
      );
      break;

    case "feature":
      await bulkFeature(
        ids,
        true
      );
      break;

    case "unfeature":
      await bulkFeature(
        ids,
        false
      );
      break;

    case "breaking":
      await bulkBreaking(
        ids,
        true
      );
      break;

    case "unbreaking":
      await bulkBreaking(
        ids,
        false
      );
      break;

    case "trending":
      await bulkTrending(
        ids,
        true
      );
      break;

    case "untrending":
      await bulkTrending(
        ids,
        false
      );
      break;

    case "delete":
      await bulkDelete(ids);
      break;

    default:
      throw new Error(
        "Unknown action."
      );
  }

  revalidatePath("/");

  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/reporter/news");

  return {
    success: true,
    message:
      "Bulk action completed successfully.",
  };
}