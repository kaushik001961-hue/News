// src/actions/create-post.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const image = formData.get("image") as string;

  if (!title || !slug || !content || !categoryId) {
    return { error: "Please fill out all required fields." };
  }

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        categoryId,
        image: image || null,
        status: "DRAFT",
      },
    });

    // Instantly wipe Vercel's edge cache so the metrics update live
    revalidatePath("/admin");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Action error:", error);
    return { error: "Something went wrong saving the news article." };
  }
}