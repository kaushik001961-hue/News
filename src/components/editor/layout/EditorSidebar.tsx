"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  FileText,
  Clock3,
  CheckCircle2,
  ImageIcon,
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import clsx from "clsx";

const menu = [
  {
    title: "Dashboard",
    href: "/editor",
    icon: LayoutDashboard,
  },
  {
    title: "All News",
    href: "/editor/news",
    icon: Newspaper,
  },
  {
    title: "Create News",
    href: "/editor/news/create",
    icon: PlusCircle,
  },
  {
    title: "Drafts",
    href: "/editor/news/drafts",
    icon: FileText,
  },
  {
    title: "Pending Review",
    href: "/editor/news/pending",
    icon: Clock3,
  },
  {
    title: "Published",
    href: "/editor/news/published",
    icon: CheckCircle2,
  },
  {
    title: "Media Library",
    href: "/editor/media",
    icon: ImageIcon,
  },
  {
    title: "Analytics",
    href: "/editor/analytics",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    href: "/editor/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/editor/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/editor/settings",
    icon: Settings,
  },
];

export default function EditorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col dark:border-slate-800 dark:bg-slate-950">
      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            AGS NEWS
          </h1>

          <p className="text-xs text-slate-500">
            Editor Panel
          </p>
        </div>

        <button className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  <Icon size={20} />

                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut size={20} />

          Logout
        </Link>
      </div>
    </aside>
  );
}