"use client";

import Link from "next/link";
import {
  Plus,
  FileText,
  Users,
  FolderTree,
  Megaphone,
  Eye,
  Settings,
  ArrowRight,
} from "lucide-react";

interface Action {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  iconClassName: string;
}

export default function QuickActions() {
  const actions: Action[] = [
    {
      title: "Create Article",
      description: "Write and publish a new news article",
      href: "/admin/posts/create",
      icon: <Plus className="h-5 w-5" />,
      iconClassName: "bg-blue-50 text-blue-600",
    },
    {
      title: "Manage Posts",
      description: "View, edit and manage all articles",
      href: "/admin/posts",
      icon: <FileText className="h-5 w-5" />,
      iconClassName: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Manage Reporters",
      description: "Review reporter registrations",
      href: "/admin/reporters",
      icon: <Users className="h-5 w-5" />,
      iconClassName: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Categories",
      description: "Manage news categories",
      href: "/admin/categories",
      icon: <FolderTree className="h-5 w-5" />,
      iconClassName: "bg-purple-50 text-purple-600",
    },
    {
      title: "Advertisements",
      description: "Manage portal advertisements",
      href: "/admin/advertisements",
      icon: <Megaphone className="h-5 w-5" />,
      iconClassName: "bg-orange-50 text-orange-600",
    },
    {
      title: "View Portal",
      description: "Open the public news portal",
      href: "/",
      icon: <Eye className="h-5 w-5" />,
      iconClassName: "bg-cyan-50 text-cyan-600",
    },
    {
      title: "Settings",
      description: "Manage portal settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      iconClassName: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used administration tools
        </p>
      </div>

      {/* Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group rounded-2xl border border-slate-200 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.iconClassName}`}
              >
                {action.icon}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-900 transition group-hover:text-blue-600">
                  {action.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {action.description}
                </p>
              </div>

              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}