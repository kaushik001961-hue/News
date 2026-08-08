"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  FolderKanban,
  Users,
  BadgeCheck,
  Settings,
  LogOut,
} from "lucide-react";

import LogoutButton from "@/components/LogoutButton";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Articles",
    href: "/admin/posts",
    icon: Newspaper,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderKanban,
  },
  {
    title: "Reporters",
    href: "/admin/reporters",
    icon: Users,
  },
  {
    title: "Press Cards",
    href: "/admin/press-cards",
    icon: BadgeCheck,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b border-slate-200 px-6 py-6">

        <h1 className="text-3xl font-black tracking-tight text-indigo-600">
          AGS
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          News Administration
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">

        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${
                active
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-200 p-4">

        <LogoutButton
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={18} />
          Logout
        </LogoutButton>

      </div>

      {/* User */}

      <div className="border-t border-slate-200 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
            {user.name?.charAt(0).toUpperCase() ?? "A"}
          </div>

          <div className="min-w-0">

            <p className="truncate font-semibold">
              {user.name}
            </p>

            <p className="truncate text-sm text-slate-500">
              {user.role}
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}