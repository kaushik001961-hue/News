import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/reporter/posts/[id]
 * Load one article owned by the logged-in reporter
 */
export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const post = await prisma.post.findFirst({
      where: {
        id,
        authorId: session.user.id,
      },
      include: {
        category: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load article.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * PUT /api/reporter/posts/[id]
 * Update article
 */
export async function PUT(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body = await req.json();

    const existing = await prisma.post.findFirst({
      where: {
        id,
        authorId: session.user.id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    if (
      existing.status !== PostStatus.DRAFT &&
      existing.status !== PostStatus.REJECTED
    ) {
      return NextResponse.json(
        {
          message:
            "Only Draft or Rejected articles can be edited.",
        },
        {
          status: 400,
        }
      );
    }

    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        categoryId: body.categoryId,

        // Resubmit for review
        status: PostStatus.PENDING,
        submittedAt: new Date(),

        reviewedAt: null,
        rejectedAt: null,
        rejectReason: null,
        reviewComment: null,
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
        message: "Unable to update article.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * DELETE /api/reporter/posts/[id]
 * Delete Draft article
 */
export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await prisma.post.findFirst({
      where: {
        id,
        authorId: session.user.id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    if (existing.status !== PostStatus.DRAFT) {
      return NextResponse.json(
        {
          message:
            "Only Draft articles can be deleted.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete article.",
      },
      {
        status: 500,
      }
    );
  }
}