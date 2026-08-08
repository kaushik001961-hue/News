"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function NewsPagination() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm lg:flex-row">

      {/* Left */}

      <div className="text-sm text-slate-500">
        Showing
        <span className="mx-1 font-semibold text-slate-900">
          1
        </span>
        to
        <span className="mx-1 font-semibold text-slate-900">
          10
        </span>
        of
        <span className="mx-1 font-semibold text-slate-900">
          248
        </span>
        news articles
      </div>

      {/* Right */}

      <div className="flex items-center gap-2">

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100">
          <ChevronLeft size={18} />
        </button>

        <button className="h-10 w-10 rounded-xl bg-blue-600 font-semibold text-white">
          1
        </button>

        <button className="h-10 w-10 rounded-xl border border-slate-200 hover:bg-slate-100">
          2
        </button>

        <button className="h-10 w-10 rounded-xl border border-slate-200 hover:bg-slate-100">
          3
        </button>

        <button className="h-10 w-10 rounded-xl border border-slate-200 hover:bg-slate-100">
          4
        </button>

        <button className="h-10 w-10 rounded-xl border border-slate-200 hover:bg-slate-100">
          5
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100">
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}