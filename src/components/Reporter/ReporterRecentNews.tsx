"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
  Newspaper,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export interface ReporterNews {
  id: string;
  title: string;
  status: "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";
  createdAt: string;
  category?: Category | null;
}

interface Props {
  news: ReporterNews[];
}

function StatusBadge({
  status,
}: {
  status: ReporterNews["status"];
}) {
  switch (status) {
    case "PUBLISHED":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Published
        </span>
      );

    case "PENDING":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Pending
        </span>
      );

    case "REJECTED":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Rejected
        </span>
      );

    default:
      return (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          Draft
        </span>
      );
  }
}

export default function ReporterRecentNews({
  news,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent News
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest submitted articles
          </p>
        </div>

        <Link
          href="/reporter/news"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View All
        </Link>

      </div>

      {/* Empty State */}

      {news.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20">

          <Newspaper
            size={60}
            className="text-slate-300"
          />

          <h3 className="mt-5 text-xl font-semibold text-slate-800">
            No News Found
          </h3>

          <p className="mt-2 text-slate-500">
            Start writing your first article.
          </p>

          <Link
            href="/reporter/news/create"
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create News
          </Link>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {news.map((item) => (

                <tr
                  key={item.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-6 py-5">

                    <div className="font-semibold text-slate-800">
                      {item.title}
                    </div>

                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {item.category?.name ?? "-"}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge
                      status={item.status}
                    />
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/reporter/news/${item.id}`}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        href={`/reporter/news/${item.id}/edit`}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </Link>

                      {item.status === "DRAFT" && (
                        <button
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}