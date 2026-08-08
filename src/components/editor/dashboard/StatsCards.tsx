import Link from "next/link";
import {
  Newspaper,
  FileText,
  Clock3,
  CheckCircle2,
  Flame,
  Eye,
  CalendarClock,
  TrendingUp,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  badge?: string;
  href?: string;
}

function StatCard({
  title,
  value,
  icon,
  color,
  badge = "Live",
  href,
}: CardProps) {
  const content = (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value.toLocaleString()}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <TrendingUp size={14} />
            {badge}
          </div>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export default async function StatsCards() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalNews,
    draftNews,
    pendingNews,
    publishedToday,
    breakingNews,
    totalViews,
  ] = await Promise.all([
    prisma.post.count(),

    prisma.post.count({
      where: {
        status: "DRAFT",
      },
    }),

    prisma.post.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.post.count({
      where: {
        status: "PUBLISHED",
        publishedAt: {
          gte: today,
        },
      },
    }),

    prisma.post.count({
      where: {
        status: "PUBLISHED",
        breaking: true,
      },
    }),

    prisma.post.aggregate({
      _sum: {
        views: true,
      },
    }),
  ]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total News"
        value={totalNews}
        icon={<Newspaper size={28} />}
        color="bg-blue-600"
        href="/editor/news"
      />

      <StatCard
        title="Draft News"
        value={draftNews}
        icon={<FileText size={28} />}
        color="bg-slate-600"
        href="/editor/news?status=DRAFT"
      />

      <StatCard
        title="Pending Review"
        value={pendingNews}
        icon={<Clock3 size={28} />}
        color="bg-orange-500"
        href="/editor/news?status=PENDING"
      />

      <StatCard
        title="Published Today"
        value={publishedToday}
        icon={<CheckCircle2 size={28} />}
        color="bg-green-600"
        href="/editor/news?filter=today"
      />

      <StatCard
        title="Breaking News"
        value={breakingNews}
        icon={<Flame size={28} />}
        color="bg-red-600"
        href="/editor/news?breaking=true"
      />

      <StatCard
        title="Total Views"
        value={totalViews._sum.views ?? 0}
        icon={<Eye size={28} />}
        color="bg-cyan-600"
      />

      <StatCard
        title="Scheduled"
        value={0}
        icon={<CalendarClock size={28} />}
        color="bg-violet-600"
        badge="Soon"
      />

      <StatCard
        title="My Articles"
        value={totalNews}
        icon={<Newspaper size={28} />}
        color="bg-pink-600"
        href="/editor/news?mine=true"
      />
    </div>
  );
}