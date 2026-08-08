"use client";

import {
  Newspaper,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

interface Props {
  totalNews: number;
  publishedNews: number;
  pendingNews: number;
  draftNews: number;
}

interface CardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bg: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
}: CardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-black text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${bg}`}
        >
          <Icon
            size={30}
            className={color}
          />
        </div>

      </div>
    </div>
  );
}

export default function ReporterStats({
  totalNews,
  publishedNews,
  pendingNews,
  draftNews,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total News"
        value={totalNews}
        icon={Newspaper}
        color="text-blue-600"
        bg="bg-blue-100"
      />

      <StatCard
        title="Published"
        value={publishedNews}
        icon={CheckCircle2}
        color="text-green-600"
        bg="bg-green-100"
      />

      <StatCard
        title="Pending Review"
        value={pendingNews}
        icon={Clock3}
        color="text-amber-600"
        bg="bg-amber-100"
      />

      <StatCard
        title="Drafts"
        value={draftNews}
        icon={FileText}
        color="text-slate-600"
        bg="bg-slate-100"
      />

    </div>
  );
}