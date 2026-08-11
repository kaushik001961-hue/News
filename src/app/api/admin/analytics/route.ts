import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    const role = session?.user?.role;

    if (
      role !== "ADMIN" &&
      role !== "EDITOR"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /* =====================================================
       NEWS
    ===================================================== */

    const [
      totalNews,
      publishedNews,
      draftNews,
      pendingNews,
      newsViews,
    ] = await Promise.all([
      prisma.post.count(),

      prisma.post.count({
        where: {
          status: "PUBLISHED",
        },
      }),

      prisma.post.count({
        where: {
          status: "DRAFT",
        },
      }),

      // Your PostStatus enum supports PENDING.
      prisma.post.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.post.aggregate({
        _sum: {
          views: true,
        },
      }),
    ]);

    /* =====================================================
       REPORTERS
    ===================================================== */

    const [
      totalReporters,
      approvedReporters,
      pendingReporters,
    ] = await Promise.all([
      prisma.reporter.count(),

      prisma.reporter.count({
        where: {
          status: "APPROVED",
        },
      }),

      prisma.reporter.count({
        where: {
          status: "PENDING",
        },
      }),
    ]);

    /* =====================================================
       ADVERTISEMENTS
    ===================================================== */

    const advertisementStats =
      await prisma.advertisement.aggregate({
        _sum: {
          impressions: true,
          clicks: true,
        },
      });

    const impressions =
      advertisementStats._sum.impressions ?? 0;

    const clicks =
      advertisementStats._sum.clicks ?? 0;

    const ctr =
      impressions > 0
        ? Number(
            (
              (clicks / impressions) *
              100
            ).toFixed(2)
          )
        : 0;

    /* =====================================================
       CATEGORY DISTRIBUTION
    ===================================================== */

    const categories =
      await prisma.category.findMany({
        include: {
          posts: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });

    const categoryData =
      categories.map((category) => ({
        name: category.name,
        value: category.posts.length,
      }));

    /* =====================================================
       RECENT NEWS
    ===================================================== */

    const recentNews =
      await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          status: true,
          views: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      });

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json({
      success: true,

      news: {
        total: totalNews,
        published: publishedNews,
        draft: draftNews,
        pending: pendingNews,
        views:
          newsViews._sum.views ?? 0,
      },

      reporters: {
        total: totalReporters,
        approved:
          approvedReporters,
        pending:
          pendingReporters,
      },

      advertisements: {
        impressions,
        clicks,
        ctr,
      },

      categoryData,

      recentNews,
    });
  } catch (error) {
    console.error(
      "ANALYTICS API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load analytics.",
      },
      {
        status: 500,
      }
    );
  }
}