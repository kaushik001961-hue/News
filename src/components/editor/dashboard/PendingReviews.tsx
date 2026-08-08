"use client";

import Link from "next/link";

import {
  CheckCircle2,
  XCircle,
  Eye,
  Clock3,
} from "lucide-react";

const pendingNews = [
  {
    id: 1,
    title: "Heavy rainfall warning issued across Gujarat",
    reporter: "Hiren Solanki",
    priority: "High",
    submitted: "15 min ago",
  },
  {
    id: 2,
    title: "New industrial policy announced",
    reporter: "Kaushik Bhatt",
    priority: "Medium",
    submitted: "32 min ago",
  },
  {
    id: 3,
    title: "Local cricket tournament begins",
    reporter: "Rahul Patel",
    priority: "Low",
    submitted: "1 hour ago",
  },
  {
    id: 4,
    title: "AI transforming digital journalism",
    reporter: "Editor Desk",
    priority: "High",
    submitted: "2 hours ago",
  },
];

export default function PendingReviews() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-100 px-6 py-5">

        <h2 className="text-xl font-bold text-slate-900">
          Pending Reviews
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          News waiting for editorial approval
        </p>

      </div>

      {/* List */}

      <div className="divide-y divide-slate-100">

        {pendingNews.map((item) => (

          <div
            key={item.id}
            className="p-5 transition hover:bg-slate-50"
          >

            <div className="flex items-start justify-between">

              <div className="flex-1">

                <h3 className="font-semibold text-slate-900">
                  {item.title}
                </h3>

                <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">

                  <span>
                    👤 {item.reporter}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={14} />
                    {item.submitted}
                  </span>

                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  item.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : item.priority === "Medium"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.priority}
              </span>

            </div>

            {/* Actions */}

            <div className="mt-5 flex gap-2">

              <Link
                href={`/editor/news/${item.id}`}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100"
              >
                <Eye size={16} />
                Preview
              </Link>

              <button className="flex items-center gap-2 rounded-xl bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700">
                <CheckCircle2 size={16} />
                Approve
              </button>

              <button className="flex items-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">
                <XCircle size={16} />
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}