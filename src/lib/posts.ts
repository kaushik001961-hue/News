import { prisma } from "@/lib/prisma";

/* ========================================
   GET ALL POSTS
======================================== */

export async function getPosts() {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

/* ========================================
   GET SINGLE POST
======================================== */

export async function getPostById(
  id: string
) {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
}

/* ========================================
   GET PUBLISHED POSTS
======================================== */

export async function getPublishedPosts() {
  try {
    return await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
      },
    });
  } catch (error) {
    console.error("Failed to fetch published posts:", error);
    return []; // Return empty array gracefully so your home page doesn't crash entirely
  }
}