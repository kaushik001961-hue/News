import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        reporter: true,
      },
    });

    if (!user || !user.reporter) {
      return NextResponse.json(
        { message: "Reporter not found" },
        { status: 404 }
      );
    }

    const reporter = user.reporter;

    const [
      totalNews,
      publishedNews,
      pendingNews,
      draftNews,
      recentNews,
      activities,
    ] = await Promise.all([
      prisma.post.count({
        where: {
          authorId: user.id,
        },
      }),

      prisma.post.count({
        where: {
          authorId: user.id,
          status: PostStatus.PUBLISHED,
        },
      }),

      prisma.post.count({
        where: {
          authorId: user.id,
          status: PostStatus.PENDING,
        },
      }),

      prisma.post.count({
        where: {
          authorId: user.id,
          status: PostStatus.DRAFT,
        },
      }),

      prisma.post.findMany({
        where: {
          authorId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        include: {
          category: true,
        },
      }),

      prisma.reporterActivity.findMany({
        where: {
          reporterId: reporter.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      }),
    ]);

    return NextResponse.json({
      reporter: {
        id: reporter.id,
        reporterId: reporter.reporterId,
        firstName: reporter.firstName,
        middleName: reporter.middleName,
        lastName: reporter.lastName,
        email: reporter.email,
        phone: reporter.phone,
        photo: reporter.photo,
        status: reporter.status,
      },

      stats: {
        totalNews,
        publishedNews,
        pendingNews,
        draftNews,
      },

      recentNews,

      activities,
    });
  } catch (error) {
    console.error("Reporter Dashboard Error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}