"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  FolderOpen,
} from "lucide-react";

import LogoutButton from "@/components/LogoutButton";

interface Props {
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
    title: "Posts",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    title: "Reporters",
    href: "/admin/reporters",
    icon: Users,
  },
  {
    title: "Press Cards",
    href: "/admin/press-cards",
    icon: CreditCard,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderOpen,
  },
];

export default function AdminSidebar({
  user,
}: Props) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white shadow-xl">

      {/* Logo */}

      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <h1 className="text-xl font-bold tracking-wide">
          AGS NEWS
        </h1>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <div className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}

        </div>

        {/* Logout */}

        <div className="mt-6 border-t border-slate-700 pt-6">
          <LogoutButton />
        </div>

      </nav>

      {/* User */}

      <div className="border-t border-slate-800 bg-slate-950 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold">
            {user.name?.charAt(0).toUpperCase() ?? "A"}
          </div>

          <div className="min-w-0">

            <p className="truncate font-semibold">
              {user.name}
            </p>

            <p className="truncate text-xs text-slate-400">
              {user.email}
            </p>

            <p className="text-xs font-medium text-emerald-400">
              {user.role}
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}