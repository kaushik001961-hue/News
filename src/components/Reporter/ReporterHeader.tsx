"use client";

import { useSession } from "next-auth/react";
import { Bell, CalendarDays, Menu, Search } from "lucide-react";

interface Props {
  onMenuClick?: () => void;
}

export default function ReporterHeader({
  onMenuClick,
}: Props) {
  const { data: session } = useSession();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((x) => x[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() ?? "RP";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">

      <div className="flex h-20 items-center justify-between px-6">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              Reporter Dashboard
            </h1>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={16} />
              {today}
            </p>

          </div>

        </div>

        {/* Center */}

        <div className="hidden w-full max-w-md lg:block">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search your news..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button className="relative rounded-xl p-2 hover:bg-slate-100">

            <Bell size={22} />

            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />

          </button>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              {initials}
            </div>

            <div className="hidden text-right md:block">

              <p className="font-semibold text-slate-800">
                {session?.user?.name ?? "Reporter"}
              </p>

              <p className="text-sm text-slate-500">
                {session?.user?.reporterId ?? ""}
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}