"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  User,
} from "lucide-react";

interface Author {
  name: string;
  email?: string;
}

interface Category {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  author?: Author;
  category?: Category | null;
}

interface RecentPostsProps {
  posts: Post[];
}

function getStatusClasses(status: string) {
  switch (status) {
    case "PUBLISHED":
      return "bg-emerald-50 text-emerald-700";

    case "DRAFT":
      return "bg-slate-100 text-slate-700";

    case "PENDING":
    case "UNDER_REVIEW":
      return "bg-amber-50 text-amber-700";

    case "REJECTED":
      return "bg-red-50 text-red-700";

    default:
      return "bg-blue-50 text-blue-700";
  }
}

function formatDate(value: string) {
  if (!value) return "--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function RecentPosts({
  posts,
}: RecentPostsProps) {
  const recentPosts = posts.slice(0, 6);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Posts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest articles from your newsroom
          </p>
        </div>

        <Link
          href="/admin/posts"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View All

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Posts */}
      <div className="divide-y divide-slate-100">
        {recentPosts.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <FileText className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-700">
              No posts found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              There are no articles to display yet.
            </p>
          </div>
        ) : (
          recentPosts.map((post) => (
            <div
              key={post.id}
              className="group p-5 transition hover:bg-slate-50"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
                  <FileText className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-900 transition group-hover:text-blue-600">
                        {post.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />

                          {post.author?.name ??
                            "Unknown Author"}
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />

                          {formatDate(
                            post.createdAt
                          )}
                        </span>

                        {post.category?.name && (
                          <span>
                            {post.category.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        post.status
                      )}`}
                    >
                      {post.status.replace(
                        /_/g,
                        " "
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {recentPosts.length > 0 && (
        <div className="border-t border-slate-100 p-4">
          <Link
            href="/admin/posts"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Manage All Posts

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}