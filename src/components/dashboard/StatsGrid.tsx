"use client";

import {
  FileText,
  CheckCircle2,
  FileEdit,
  Clock3,
  Users,
  UserCheck,
  Activity,
  FolderTree,
} from "lucide-react";

interface StatsGridProps {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  pendingPosts: number;

  totalReporters: number;
  approvedReporters: number;
  activeReporters: number;

  totalCategories: number;
}

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClassName: string;
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            {value.toLocaleString()}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function StatsGrid({
  totalPosts,
  publishedPosts,
  draftPosts,
  pendingPosts,
  totalReporters,
  approvedReporters,
  activeReporters,
  totalCategories,
}: StatsGridProps) {
  const cards: StatCardProps[] = [
    {
      title: "Total Posts",
      value: totalPosts,
      description: "All newsroom articles",
      icon: (
        <FileText className="h-6 w-6" />
      ),
      iconClassName:
        "bg-blue-50 text-blue-600",
    },

    {
      title: "Published",
      value: publishedPosts,
      description: "Live on the portal",
      icon: (
        <CheckCircle2 className="h-6 w-6" />
      ),
      iconClassName:
        "bg-emerald-50 text-emerald-600",
    },

    {
      title: "Drafts",
      value: draftPosts,
      description: "Articles in draft",
      icon: (
        <FileEdit className="h-6 w-6" />
      ),
      iconClassName:
        "bg-amber-50 text-amber-600",
    },

    {
      title: "Pending Review",
      value: pendingPosts,
      description: "Awaiting editorial review",
      icon: (
        <Clock3 className="h-6 w-6" />
      ),
      iconClassName:
        "bg-orange-50 text-orange-600",
    },

    {
      title: "Total Reporters",
      value: totalReporters,
      description: "Registered reporters",
      icon: (
        <Users className="h-6 w-6" />
      ),
      iconClassName:
        "bg-purple-50 text-purple-600",
    },

    {
      title: "Approved Reporters",
      value: approvedReporters,
      description: "Approved newsroom staff",
      icon: (
        <UserCheck className="h-6 w-6" />
      ),
      iconClassName:
        "bg-green-50 text-green-600",
    },

    {
      title: "Active Reporters",
      value: activeReporters,
      description: "Currently active",
      icon: (
        <Activity className="h-6 w-6" />
      ),
      iconClassName:
        "bg-cyan-50 text-cyan-600",
    },

    {
      title: "Categories",
      value: totalCategories,
      description: "Categories in use",
      icon: (
        <FolderTree className="h-6 w-6" />
      ),
      iconClassName:
        "bg-indigo-50 text-indigo-600",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            {...card}
          />
        ))}
      </div>
    </section>
  );
}