import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostsTable from "./PostsTable";
import StatsCards from "./StatsCards";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Dashboard Statistics
  const totalPosts = posts.length;

  const publishedPosts = posts.filter(
    (post) => post.status === "PUBLISHED"
  ).length;

  const draftPosts = posts.filter(
    (post) => post.status === "DRAFT"
  ).length;

  const totalViews = posts.reduce(
    (sum, post) => sum + post.views,
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            News Articles
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all news articles from one place.
          </p>
        </div>

        <Link
          href="/admin/posts/create"
          className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          + Create News
        </Link>
      </div>

      {/* Statistics */}
      <StatsCards
        total={totalPosts}
        published={publishedPosts}
        draft={draftPosts}
        views={totalViews}
      />

      {/* Posts Table */}
      <div className="rounded-xl border bg-white shadow-sm">
        <PostsTable posts={posts} />
      </div>
    </div>
  );
}