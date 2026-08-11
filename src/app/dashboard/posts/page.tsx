import Link from "next/link";

import { prisma } from "@/lib/prisma";
import NewsTable from "@/components/dashboard/NewsTable";

export default async function NewsPage() {
  const news = await prisma.post.findMany({
    include: {
      author: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8 p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            News Management
          </h1>

          <p className="mt-1 text-slate-500">
            Manage all news articles from one place.
          </p>
        </div>

        <Link
          href="/editor/news/create"
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          + Create News
        </Link>

      </div>

      {/* =====================================================
          NEWS TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <NewsTable posts={news} />

      </div>

    </div>
  );
}