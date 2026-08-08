import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import NewsTable from "@/components/editor/news/NewsTable";
import NewsStats from "@/components/editor/news/NewsStats";
import NewsToolbar from "@/components/editor/news/NewsToolbar";
import NewsFilters from "@/components/editor/news/NewsFilters";
import NewsPagination from "@/components/editor/news/NewsPagination";

export default async function ScheduledNewsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch scheduled posts, stats, and categories in parallel
  const [
    news,
    totalCount,
    draftCount,
    publishedCount,
    scheduledCount,
    archivedCount,
    categories,
  ] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: "SCHEDULED",
      },
      include: {
        category: true,
        reporter: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.post.count(),
    prisma.post.count({ where: { status: "DRAFT" } }),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: "SCHEDULED" } }),
    prisma.post.count({ where: { status: "ARCHIVED" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const stats = {
    total: totalCount,
    drafts: draftCount,
    published: publishedCount,
    scheduled: scheduledCount,
    archived: archivedCount,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-slate-900">
          Scheduled News
        </h1>

        <p className="mt-2 text-slate-500">
          Manage queued and scheduled publication articles.
        </p>
      </div>

      <NewsStats stats={stats as any} />

      <NewsToolbar />

      <NewsFilters categories={categories as any} {...({} as any)} />

      <NewsTable news={news as any} />

      <NewsPagination />
    </div>
  );
}