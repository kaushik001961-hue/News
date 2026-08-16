import { prisma } from "@/lib/prisma";

import StatsCardsClient from "./StatsCardsClient";

export default async function StatsCards() {
  const [
    totalNews,
    draftNews,
    pendingNews,
    publishedToday,
    breakingNews,
    totalViews,
    scheduledNews,
    myArticles,
  ] = await Promise.all([
    prisma.post.count(),

    prisma.post.count({
      where: {
        status: "DRAFT",
      },
    }),

    prisma.post.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.post.count({
      where: {
        status: "PUBLISHED",
        publishedAt: {
          gte: new Date(
            new Date().setHours(0, 0, 0, 0)
          ),
        },
      },
    }),

    prisma.post.count({
      where: {
        breaking: true,
      },
    }),

    prisma.post.aggregate({
      _sum: {
        views: true,
      },
    }),

    prisma.post.count({
      where: {
       status: "PENDING",
      },
    }),

    prisma.post.count(),
  ]);

  return (
    <StatsCardsClient
      {...({
        totalNews,
        draftNews,
        pendingNews,
        publishedToday,
        breakingNews,
        totalViews: totalViews._sum.views ?? 0,
        scheduledNews,
        myArticles,
      } as any)}
    />
  );
}