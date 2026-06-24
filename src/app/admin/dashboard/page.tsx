import { prisma } from "@/lib/prisma";

import StatCard from "@/components/dashboard/StatCard";
import TrafficChart from "@/components/dashboard/TrafficChart";
import RecentPosts from "@/components/dashboard/RecentPosts";
import TopCategories from "@/components/dashboard/TopCategories";
import QuickActions from "@/components/dashboard/QuickActions";

export default async function DashboardPage() {

  const [
    posts,
    categories,
    users,
    media,
    recentPosts,
  ] = await Promise.all([

    prisma.post.count(),

    prisma.category.count(),

    prisma.user.count(),

    prisma.media.count(),

    prisma.post.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    }),

  ]);

  return (

    <div className="space-y-8 p-6">

      <h1 className="text-4xl font-bold">

        Dashboard

      </h1>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Posts"
          value={posts}
        />

        <StatCard
          title="Categories"
          value={categories}
        />

        <StatCard
          title="Users"
          value={users}
        />

        <StatCard
          title="Media"
          value={media}
        />

      </div>

      <TrafficChart />

      <div className="grid gap-6 lg:grid-cols-2">

        <RecentPosts posts={recentPosts} />

        <TopCategories />

      </div>

      <QuickActions />

    </div>

  );

}
