"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function ReporterNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">

      {/* Search */}

      <div className="relative w-full max-w-lg">

        <Search
          className="absolute left-4 top-3.5 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search news..."
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button className="relative rounded-xl p-3 hover:bg-slate-100">

          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-blue-700"
          />

          <div>

            <h4 className="font-semibold">

              Reporter

            </h4>

            <p className="text-sm text-slate-500">

              AGS NEWS

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}