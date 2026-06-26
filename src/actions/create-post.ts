// src/actions/create-post.ts
import { prisma } from "@/lib/prisma"; // Adjust based on your prisma client path
import { auth } from "@/auth";         // Adjust based on your Auth library

export async function createPost(formData: FormData) {
  // 1. Get the current user session
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to create a post.");
  }

  // 2. Extract your form data
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const image = formData.get("image") as string;

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        image: image || null,
        status: "DRAFT",
        authorId: session.user.id, // <-- FIXES THE TS ERROR
        categoryId: categoryId || null,
      },
    });
  } catch (error) {
    console.error(error);
  }
}