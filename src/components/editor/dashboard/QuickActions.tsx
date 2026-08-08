"use client";

import Link from "next/link";

import {
  Plus,
  FileClock,
  FileText,
  Newspaper,
  ImageIcon,
  BarChart3,
} from "lucide-react";

const actions = [
  {
    title: "Create News",
    description: "Write a new article",
    href: "/editor/news/create",
    icon: Plus,
    color: "bg-blue-600",
  },
  {
    title: "Pending Review",
    description: "Review submitted news",
    href: "/editor/review",
    icon: FileClock,
    color: "bg-orange-500",
  },
  {
    title: "Drafts",
    description: "Continue editing drafts",
    href: "/editor/news?status=DRAFT",
    icon: FileText,
    color: "bg-slate-600",
  },
  {
    title: "Published",
    description: "Manage published news",
    href: "/editor/news?status=PUBLISHED",
    icon: Newspaper,
    color: "bg-green-600",
  },
  {
    title: "Media Library",
    description: "Images & Videos",
    href: "/editor/media",
    icon: ImageIcon,
    color: "bg-pink-600",
  },
  {
    title: "Analytics",
    description: "Performance reports",
    href: "/editor/analytics",
    icon: BarChart3,
    color: "bg-violet-600",
  },
];

export default function QuickActions() {
  return (
    <section>

      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500">
          Frequently used newsroom tools
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${action.color}`}
              >
                <Icon size={30} />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {action.description}
              </p>
            </Link>
          );
        })}

      </div>

    </section>
  );
}