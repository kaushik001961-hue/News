"use client";

import {
  Newspaper,
  FileText,
  CheckCircle2,
  Clock3,
  Flame,
  Star,
} from "lucide-react";

interface StatusStat {
  status: string;
  _count: number;
}

interface NewsStatsProps {
  stats: StatusStat[];
}

export default function NewsStats({
  stats,
}: NewsStatsProps) {
  const total = stats.reduce(
    (sum, item) => sum + item._count,
    0
  );

  const drafts =
    stats.find((s) => s.status === "DRAFT")
      ?._count ?? 0;

  const pending =
    stats.find((s) => s.status === "PENDING")
      ?._count ?? 0;

  const published =
    stats.find((s) => s.status === "PUBLISHED")
      ?._count ?? 0;

  const archived =
    stats.find((s) => s.status === "ARCHIVED")
      ?._count ?? 0;

  const cards = [
    {
      title: "Total News",
      value: total,
      icon: Newspaper,
      color: "bg-blue-600",
    },
    {
      title: "Drafts",
      value: drafts,
      icon: FileText,
      color: "bg-slate-600",
    },
    {
      title: "Published",
      value: published,
      icon: CheckCircle2,
      color: "bg-green-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color: "bg-orange-500",
    },
    {
      title: "Archived",
      value: archived,
      icon: Flame,
      color: "bg-red-600",
    },
    {
      title: "Featured",
      value: "—",
      icon: Star,
      color: "bg-indigo-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  {card.value}
                </h2>

              </div>

              <div
                className={`rounded-2xl p-4 text-white ${card.color}`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}