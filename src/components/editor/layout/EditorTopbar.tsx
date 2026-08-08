"use client";

import { useState } from "react";
import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
  UserCircle,
} from "lucide-react";

export default function EditorTopbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button className="rounded-xl p-2 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800">
          <Menu className="h-6 w-6" />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search news..."
            className="w-80 rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Date */}
        <div className="hidden text-right lg:block">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="text-xs text-slate-500">
            Welcome back, Editor
          </p>
        </div>

        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-xl border border-slate-200 p-3 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl border border-slate-200 p-3 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
          <UserCircle className="h-8 w-8 text-blue-600" />

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Editor
            </p>

            <p className="text-xs text-slate-500">
              News Editor
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}