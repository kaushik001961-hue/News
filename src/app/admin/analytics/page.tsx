import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AnalyticsClient from "@/components/admin/analytics/AnalyticsClient";

export default async function AdminAnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "EDITOR") {
    redirect("/");
  }

  // 1. Fetch Summary Totals
  const [totalPosts, publishedPosts, totalCategories, totalReporters] =
    await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.category.count(),
      prisma.reporter.count({ where: { status: "APPROVED" } }),
    ]);

  // 2. Aggregate Total Views across all posts
  const viewsAggregate = await prisma.post.aggregate({
    _sum: { views: true },
  });
  const totalViews = viewsAggregate._sum.views || 0;

  // 3. Fetch Top 5 Most Viewed Articles
  const topArticles = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { views: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      slug: true,
      views: true,
      createdAt: true,
      category: { select: { name: true } },
    },
  });

  // 4. Fetch Category Breakdown
  const categoriesWithCount = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      _count: { select: { posts: true } },
    },
    orderBy: {
      posts: { _count: "desc" },
    },
    take: 6,
  });

  return (
    <AnalyticsClient
      stats={{
        totalPosts,
        publishedPosts,
        totalViews,
        totalCategories,
        totalReporters,
      }}
      topArticles={topArticles}
      categories={categoriesWithCount}
    />
  );
}