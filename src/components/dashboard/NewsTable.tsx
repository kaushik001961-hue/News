"use client";

import Link from "next/link";
import {
  Edit,
  Eye,
  FileText,
  Trash2,
  CalendarDays,
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
 createdAt: Date | string;
  author?: Author | null;
  category?: Category | null;
  slug?: string | null;
}

interface PostsTableProps {
  posts?: Post[];
  onDelete?: (id: string) => void;
}

function statusClass(status: string) {
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

function formatDate(date: string | Date) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "—";
  }

  return value.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


export default function PostsTable({
  posts = [],
  onDelete,
}: PostsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Posts
            </h2>

            <p className="text-sm text-slate-500">
              Manage your news articles
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {posts.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <FileText className="h-7 w-7 text-slate-400" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-700">
            No posts found
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            There are currently no articles to display.
          </p>

          <Link
            href="/admin/posts/create"
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Create Article
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Article
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Author
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Article */}
                    <td className="max-w-md px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <FileText className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {post.title}
                          </p>

                          {post.slug && (
                            <p className="mt-1 truncate text-xs text-slate-400">
                              /{post.slug}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      {post.category?.name ? (
                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                          {post.category.name}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400">
                          Uncategorized
                        </span>
                      )}
                    </td>

                    {/* Author */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />

                        <span className="text-sm text-slate-600">
                          {post.author?.name ??
                            "Unknown"}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusClass(
                          post.status
                        )}`}
                      >
                        {post.status.replace(
                          /_/g,
                          " "
                        )}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays className="h-4 w-4" />

                        {formatDate(
                          post.createdAt
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          title="View"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          title="Edit"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>

                        {onDelete && (
                          <button
                            type="button"
                            title="Delete"
                            onClick={() =>
                              onDelete(post.id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100 lg:hidden">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileText className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {post.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                          post.status
                        )}`}
                      >
                        {post.status.replace(
                          /_/g,
                          " "
                        )}
                      </span>

                      {post.category?.name && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                          {post.category.name}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 space-y-1 text-xs text-slate-500">
                      <p>
                        Author:{" "}
                        {post.author?.name ??
                          "Unknown"}
                      </p>

                      <p>
                        Date:{" "}
                        {formatDate(post.createdAt)}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>

                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Edit
                      </Link>

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() =>
                            onDelete(post.id)
                          }
                          className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}