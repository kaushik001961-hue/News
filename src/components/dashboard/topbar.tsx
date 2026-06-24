
"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-4 z-40 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="h-16 rounded-3xl border border-white/40 bg-white/70 backdrop-blur-2xl shadow-xl px-6 flex items-center justify-between">

          {/* Search */}

          <div className="hidden md:flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 w-[340px]">

            <Search className="w-4 h-4 text-gray-500" />

            <input
              type="text"
              placeholder="Search news..."
              className="bg-transparent outline-none text-sm w-full"
            />

          </div>

          {/* Mobile Search */}

          <button className="md:hidden">

            <Search className="w-5 h-5" />

          </button>

          {/* Right Side */}

          <div className="flex items-center gap-4">

            <button className="relative rounded-full p-2 hover:bg-gray-100 transition">

              <Bell className="w-5 h-5" />

              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600"></span>

            </button>

            <button className="rounded-full hover:bg-gray-100 transition p-1">

              <UserCircle className="w-9 h-9 text-gray-700" />

            </button>

          </div>

        </div>

      </div>

    </header>
  );
}
