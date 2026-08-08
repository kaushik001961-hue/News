"use client";

import Link from "next/link";
import {
  FilePlus2,
  Newspaper,
  Images,
  User,
  FolderOpen,
  CreditCard,
} from "lucide-react";

const actions = [
  {
    title: "Create News",
    description: "Write and submit a new news article",
    href: "/reporter/news/create",
    icon: FilePlus2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "My News",
    description: "View and manage your news articles",
    href: "/reporter/news",
    icon: Newspaper,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Media Library",
    description: "Upload and manage photos",
    href: "/reporter/media",
    icon: Images,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "My Profile",
    description: "Update your personal information",
    href: "/reporter/profile",
    icon: User,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Documents",
    description: "Manage your uploaded documents",
    href: "/reporter/documents",
    icon: FolderOpen,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Press Card",
    description: "View or download your press card",
    href: "/reporter/press-card",
    icon: CreditCard,
    color: "bg-pink-100 text-pink-600",
  },
];

export default function ReporterQuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used shortcuts
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {action.description}
              </p>
            </Link>
          );
        })}

      </div>

    </div>
  );
}