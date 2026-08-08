"use client";

import Link from "next/link";

import {
  Eye,
  Pencil,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Government announces new education policy",
    category: "Politics",
    reporter: "Kaushik Bhatt",
    views: 1245,
    status: "Published",
    date: "01 Aug 2026",
    image: "/images/news-1.jpg",
  },
  {
    id: 2,
    title: "Heavy rainfall alert issued in Gujarat",
    category: "Local",
    reporter: "Hiren Solanki",
    views: 856,
    status: "Pending",
    date: "01 Aug 2026",
    image: "/images/news-2.jpg",
  },
  {
    id: 3,
    title: "India wins thrilling cricket series",
    category: "Sports",
    reporter: "Editor Desk",
    views: 5210,
    status: "Published",
    date: "31 Jul 2026",
    image: "/images/news-3.jpg",
  },
  {
    id: 4,
    title: "AI transforming digital journalism",
    category: "Technology",
    reporter: "Kaushik Bhatt",
    views: 932,
    status: "Draft",
    date: "31 Jul 2026",
    image: "/images/news-4.jpg",
  },
];

export default function RecentArticles() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Recent News
          </h2>

          <p className="text-sm text-slate-500">
            Latest articles from the newsroom
          </p>
        </div>

        <Link
          href="/editor/news"
          className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          View All
        </Link>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-sm font-semibold text-slate-600">

              <th className="px-6 py-4">Headline</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Reporter</th>
              <th className="px-6 py-4">Views</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {articles.map((article) => (

              <tr
                key={article.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-14 w-20 rounded-lg object-cover"
                    />

                    <div>

                      <h4 className="font-semibold text-slate-900">
                        {article.title}
                      </h4>

                      <p className="text-xs text-slate-500">
                        #{article.id}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {article.category}
                  </span>

                </td>

                <td className="px-6 py-5">
                  {article.reporter}
                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2">

                    <Eye
                      size={16}
                      className="text-slate-400"
                    />

                    {article.views.toLocaleString()}

                  </div>

                </td>

                <td className="px-6 py-5">

                  {article.status === "Published" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      <CheckCircle2 size={15} />
                      Published
                    </span>
                  )}

                  {article.status === "Pending" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      <Clock3 size={15} />
                      Pending
                    </span>
                  )}

                  {article.status === "Draft" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                      <FileText size={15} />
                      Draft
                    </span>
                  )}

                </td>

                <td className="px-6 py-5 text-slate-500">
                  {article.date}
                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button className="rounded-lg p-2 hover:bg-slate-100">
                      <Pencil size={18} />
                    </button>

                    <button className="rounded-lg p-2 hover:bg-slate-100">
                      <MoreHorizontal size={18} />
                    </button>

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