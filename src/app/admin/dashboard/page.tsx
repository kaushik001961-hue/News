import { prisma } from "@/lib/prisma";

import StatCard from "@/components/admin/StatCard";

export default async function DashboardPage() {
  const [
    posts,
    categories,
    users,
    media,
    recentPostsRaw,
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

  // Format Date objects to ISO strings to satisfy TypeScript component prop requirements
  const recentPosts = recentPostsRaw.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt ? post.updatedAt.toISOString() : undefined,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
  }));

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Posts" value={posts} />
        <StatCard title="Categories" value={categories} />
        <StatCard title="Users" value={users} />
        <StatCard title="Media" value={media} />
      </div>
         </div>
  );
}