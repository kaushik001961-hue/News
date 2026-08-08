"use client";

import { Bell, LogOut, Search, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-slate-100 px-6 py-4">

      <div className="flex h-16 items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">

        {/* Left */}

        <div className="flex items-center gap-8">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="text-sm text-slate-500">
              Welcome back, Administrator
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 w-80">

            <Search className="h-4 w-4 text-slate-500" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button className="relative rounded-full p-2 transition hover:bg-slate-100">

            <Bell className="h-5 w-5 text-slate-600" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />

          </button>

          <button className="rounded-full p-1 transition hover:bg-slate-100">

            <UserCircle className="h-9 w-9 text-slate-700" />

          </button>

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}