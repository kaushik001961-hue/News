// src/actions/create-post.ts
import { prisma } from "@/lib/prisma"; // Adjust based on your actual prisma client utility file
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust this path if your authOptions are exported from elsewhere

export async function createPost(formData: FormData) {
  // 1. Get the current user session server-side
  const session = await getServerSession(authOptions);

  // 2. Safeguard: block unauthorized users
  if (!session?.user?.id) {
    throw new Error("You must be logged in to create a post.");
  }

  // 3. Extract your form data
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
        authorId: session.user.id, // <-- FIXES THE TYPE ERROR
        categoryId: categoryId || null,
      },
    });
  } catch (error) {
    console.error("Failed to create post:", error);
    throw new Error("Database operation failed.");
  }
}