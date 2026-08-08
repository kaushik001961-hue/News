import { prisma } from "@/lib/prisma";
export async function getAdsDashboard() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const [
    clicks,
    impressions,
    revenue,
  ] = await Promise.all([
    prisma.adClick.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    }),

    prisma.adImpression.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    }),

(prisma as any).adRevenue.aggregate({
  _sum: {
    revenue: true,
  },
      where: {
        date: {
          gte: today,
        },
      },
    }),
  ]);

  const ctr =
    impressions > 0
      ? (clicks / impressions) * 100
      : 0;

  return {
    clicks,
    impressions,
    ctr: Number(ctr.toFixed(2)),
    revenue:
      revenue._sum.revenue || 0,
  };
}