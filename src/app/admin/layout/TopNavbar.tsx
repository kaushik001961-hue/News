"use client";

import { Bell, Menu, Moon, Search } from "lucide-react";

interface TopNavbarProps {
  title?: string;
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export default function TopNavbar({
  title = "Dashboard",
  user,
}: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur-md">

      {/* Left */}

      <div className="flex items-center gap-4">

        {/* Mobile Menu */}

        <button className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden">
          <Menu size={22} />
        </button>

        <div>

          <p className="text-sm text-slate-500">
            AGS News CMS
          </p>

          <h1 className="text-2xl font-bold text-slate-900">
            {title}
          </h1>

        </div>

      </div>

      {/* Center Search */}

      <div className="hidden w-full max-w-xl px-8 lg:block">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search articles, reporters..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        {/* Dark Mode */}

        <button className="rounded-xl p-3 transition hover:bg-slate-100">
          <Moon size={20} />
        </button>

        {/* Notifications */}

        <button className="relative rounded-xl p-3 transition hover:bg-slate-100">

          <Bell size={20} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />

        </button>

        {/* Profile */}

        <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:border-indigo-500 hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">

            {user.name?.charAt(0).toUpperCase() ?? "A"}

          </div>

          <div className="hidden text-left md:block">

            <p className="font-semibold leading-none">
              {user.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {user.role}
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}