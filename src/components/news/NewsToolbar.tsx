"use client";

import Link from "next/link";
import {
  Plus,
  Search,
  RefreshCw,
  Download,
  Filter,
} from "lucide-react";

interface NewsToolbarProps {
  search: string;
  onSearch: (value: string) => void;
  onRefresh?: () => void;
  totalNews?: number;
}

export default function NewsToolbar({
  search,
  onSearch,
  onRefresh,
  totalNews = 0,
}: NewsToolbarProps) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            News Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Total News:{" "}
            <span className="font-semibold">
              {totalNews}
            </span>
          </p>
        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">

          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50"
          >
            <Download size={18} />
            Export
          </button>

          <Link
            href="/admin/news/create"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add News
          </Link>

        </div>

      </div>

      {/* Search */}

      <div className="mt-5 flex flex-col gap-3 lg:flex-row">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search news..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
          />

        </div>

        <button
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 hover:bg-slate-50"
        >
          <Filter size={18} />
          Filters
        </button>

      </div>
    </div>
  );
}