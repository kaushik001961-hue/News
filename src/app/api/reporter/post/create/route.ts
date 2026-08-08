import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

let slug = body.slug;

const existing = await prisma.post.findUnique({
  where: { slug },
});

if (existing) {
  slug = `${slug}-${Date.now()}`;
}

    const post = await prisma.post.create({
  data: {
    title: body.title,
    slug,
    excerpt: body.excerpt,
    content: body.content,
    authorId: session.user.id,
    categoryId: body.categoryId,
    status: body.status,

submittedAt:
  body.status === PostStatus.PENDING
    ? new Date()
    : null,
  },
});

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create article.",
      },
      {
        status: 500,
      }
    );
  }
}