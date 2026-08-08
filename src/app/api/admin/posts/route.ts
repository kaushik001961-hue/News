import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        category: true,
        state: true,
        district: true,
        taluka: true,

        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      total: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Posts API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch posts.",
      },
      {
        status: 500,
      }
    );
  }
}