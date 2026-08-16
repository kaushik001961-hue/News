import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ScheduledNewsPage() {
  const posts = await prisma.post.findMany({
    where: {
      status: "PENDING",
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      category: true,
    },
  });

  const [
    totalPosts,
    draftPosts,
    publishedPosts,
    pendingPosts,
    archivedPosts,
  ] = await Promise.all([
    prisma.post.count(),

    prisma.post.count({
      where: {
        status: "DRAFT",
      },
    }),

    prisma.post.count({
      where: {
        status: "PUBLISHED",
      },
    }),

    prisma.post.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.post.count({
      where: {
        status: "ARCHIVED",
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Scheduled / Pending News
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              News waiting for editor review and publication.
            </p>
          </div>

          <Link
            href="/editor/news"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to News
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard
          label="Total"
          value={totalPosts}
        />

        <StatCard
          label="Drafts"
          value={draftPosts}
        />

        <StatCard
          label="Published"
          value={publishedPosts}
        />

        <StatCard
          label="Pending"
          value={pendingPosts}
        />

        <StatCard
          label="Archived"
          value={archivedPosts}
        />
      </div>

      {/* POSTS */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold text-slate-900">
            Pending News
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {posts.length} article
            {posts.length === 1 ? "" : "s"} waiting for review.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-lg font-semibold text-slate-900">
              No pending news
            </div>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no news articles waiting for review.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-slate-900">
                    {post.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>
                      {post.category?.name || "Uncategorized"}
                    </span>

                    <span>•</span>

                    <span>
                      {new Date(
                        post.createdAt
                      ).toLocaleDateString()}
                    </span>

                    <span className="rounded-full bg-amber-100 px-2 py-1 font-semibold text-amber-700">
                      PENDING
                    </span>
                  </div>
                </div>

                <Link
                  href={`/editor/news/edit/${post.id}`}
                  className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Review
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}