"use client";

import Link from "next/link";

import {
  Flame,
  Eye,
  Clock3,
  ArrowRight,
} from "lucide-react";

const breakingNews = [
  {
    id: 1,
    title: "Heavy Rain Alert Issued Across Gujarat",
    views: 12450,
    time: "10 mins ago",
  },
  {
    id: 2,
    title: "Parliament Passes New Education Bill",
    views: 10892,
    time: "22 mins ago",
  },
  {
    id: 3,
    title: "India Wins ODI Series Against Australia",
    views: 9840,
    time: "40 mins ago",
  },
  {
    id: 4,
    title: "Sensex Crosses New All-Time High",
    views: 8735,
    time: "1 hour ago",
  },
  {
    id: 5,
    title: "Cyclone Warning Issued for Coastal Areas",
    views: 7962,
    time: "2 hours ago",
  },
];

export default function BreakingNewsWidget() {
  return (
    <div className="overflow-hidden rounded-3xl border border-red-200 bg-white shadow-sm">

      {/* Header */}

      <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-5 text-white">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-white/20 p-2">
            <Flame size={22} />
          </div>

          <div>

            <h2 className="text-xl font-bold">
              Breaking News
            </h2>

            <p className="text-sm text-red-100">
              Live newsroom updates
            </p>

          </div>

        </div>

      </div>

      {/* Stories */}

      <div className="divide-y divide-slate-100">

        {breakingNews.map((news) => (

          <div
            key={news.id}
            className="p-5 transition hover:bg-slate-50"
          >

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">

              <Flame size={14} />

              BREAKING

            </div>

            <h3 className="font-semibold text-slate-900">
              {news.title}
            </h3>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">

              <div className="flex gap-4">

                <span className="flex items-center gap-1">
                  <Eye size={15} />
                  {news.views.toLocaleString()}
                </span>

                <span className="flex items-center gap-1">
                  <Clock3 size={15} />
                  {news.time}
                </span>

              </div>

              <Link
                href={`/editor/news/${news.id}`}
                className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
              >
                View
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}