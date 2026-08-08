import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: session.user.id,
      },

      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        status: post.status,
        views: post.views,
        createdAt: post.createdAt,
        publishedAt: post.publishedAt,
        category: post.category
          ? {
              id: post.category.id,
              name: post.category.name,
            }
          : null,
      })),
    });
  } catch (error) {
  console.error("Reporter Posts API Error:", error);

  return NextResponse.json(
    {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    },
    {
      status: 500,
    }
  );
}
}