"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { ReporterPost } from "@/app/reporter/news/page";

interface Props {
  posts: ReporterPost[];
}

function StatusBadge({
  status,
}: {
  status: ReporterPost["status"];
}) {
  const styles = {
    DRAFT:
      "bg-slate-100 text-slate-700",

    PENDING:
      "bg-yellow-100 text-yellow-700",

    UNDER_REVIEW:
      "bg-blue-100 text-blue-700",

    PUBLISHED:
      "bg-green-100 text-green-700",

    REJECTED:
      "bg-red-100 text-red-700",

    ARCHIVED:
      "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export default function ReporterNewsTable({
  posts,
}: Props) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">

        <h2 className="text-xl font-bold">
          No Articles Found
        </h2>

        <p className="mt-3 text-slate-500">
          Start by creating your first news
          article.
        </p>

        <Link
          href="/reporter/news/create"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Create News
        </Link>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Views
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Created
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Published
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {posts.map((post) => (

              <tr
                key={post.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                  <div className="font-semibold">
                    {post.title}
                  </div>

                </td>

                <td className="px-6 py-5">

                  {post.category?.name ?? "-"}

                </td>

                <td className="px-6 py-5">

                  {post.views}

                </td>

                <td className="px-6 py-5">

                  {new Date(
                    post.createdAt
                  ).toLocaleDateString()}

                </td>

                <td className="px-6 py-5">

                  {post.publishedAt
                    ? new Date(
                        post.publishedAt
                      ).toLocaleDateString()
                    : "-"}

                </td>

                <td className="px-6 py-5">

                  <StatusBadge
                    status={post.status}
                  />

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    <Link
                      href={`/reporter/news/${post.id}`}
                      className="rounded-lg p-2 hover:bg-slate-100"
                    >
                      <Eye
                        size={18}
                      />
                    </Link>

                    {(post.status ===
                      "DRAFT" ||
                      post.status ===
                        "REJECTED") && (
                      <Link
                        href={`/reporter/news/${post.id}/edit`}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil
                          size={18}
                        />
                      </Link>
                    )}

                    {post.status ===
                      "DRAFT" && (
                      <button
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2
                          size={18}
                        />
                      </button>
                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}