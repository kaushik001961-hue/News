"use client";

import {
  FolderOpen,
  CheckCircle2,
  EyeOff,
  Newspaper,
} from "lucide-react";

interface CategoryStatsProps {
  total: number;
  active: number;
  inactive: number;
  totalNews: number;
}

export default function CategoryStats({
  total,
  active,
  inactive,
  totalNews,
}: CategoryStatsProps) {
  const stats = [
    {
      title: "Total Categories",
      value: total,
      icon: FolderOpen,
      color: "bg-blue-600",
    },
    {
      title: "Active",
      value: active,
      icon: CheckCircle2,
      color: "bg-green-600",
    },
    {
      title: "Inactive",
      value: inactive,
      icon: EyeOff,
      color: "bg-red-600",
    },
    {
      title: "News Articles",
      value: totalNews,
      icon: Newspaper,
      color: "bg-indigo-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-900">
                  {item.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl p-4 text-white ${item.color}`}
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