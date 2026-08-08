"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
  Newspaper,
  FilePlus2,
  Images,
  User,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  FolderOpen,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/reporter",
    icon: LayoutDashboard,
  },
  {
    title: "Create News",
    href: "/reporter/news/create",
    icon: FilePlus2,
  },
  {
    title: "My News",
    href: "/reporter/news",
    icon: Newspaper,
  },
  {
    title: "Media",
    href: "/reporter/media",
    icon: Images,
  },
  {
    title: "Documents",
    href: "/reporter/documents",
    icon: FolderOpen,
  },
  {
    title: "Profile",
    href: "/reporter/profile",
    icon: User,
  },
  {
    title: "Press Card",
    href: "/reporter/press-card",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/reporter/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/reporter/settings",
    icon: Settings,
  },
];

export default function ReporterSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 text-white">

      {/* Logo */}

      <div className="border-b border-slate-800 px-6 py-7">

        <h1 className="text-3xl font-black tracking-wide">
          AGS NEWS
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Reporter Portal
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Online
        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <div className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/reporter"
                ? pathname === "/reporter"
                : pathname.startsWith(item.href);

          return (
  <a
    key={item.href}
    href={item.href}
    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-blue-600 text-white shadow-lg"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`}
  >
    <Icon size={20} />
    <span>{item.title}</span>
  </a>
);
          })}

        </div>

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}