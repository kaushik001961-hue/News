"use client";

import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
  Ban,
} from "lucide-react";

interface ReporterStatsProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  suspended: number;
}

const cards = [
  {
    key: "total",
    title: "Total Reporters",
    icon: Users,
    color: "bg-indigo-600",
  },
  {
    key: "pending",
    title: "Pending",
    icon: Clock3,
    color: "bg-amber-500",
  },
  {
    key: "approved",
    title: "Approved",
    icon: CheckCircle2,
    color: "bg-emerald-600",
  },
  {
    key: "rejected",
    title: "Rejected",
    icon: XCircle,
    color: "bg-red-600",
  },
  {
    key: "suspended",
    title: "Blocked",
    icon: Ban,
    color: "bg-slate-700",
  },
];

export default function ReporterStats({
  total,
  pending,
  approved,
  rejected,
  suspended,
}: ReporterStatsProps) {
  const values = {
    total,
    pending,
    approved,
    rejected,
    suspended,
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">
                  {
                    values[
                      card.key as keyof typeof values
                    ]
                  }
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color} text-white transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={28} />
              </div>
            </div>

            <div className="mt-6 h-1 rounded-full bg-slate-100">
              <div
                className={`h-1 rounded-full ${card.color}`}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}