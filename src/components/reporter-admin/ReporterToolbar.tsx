"use client";

import { RotateCcw, Search } from "lucide-react";

interface ReporterToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  state: string;
  onStateChange: (value: string) => void;

  district: string;
  onDistrictChange: (value: string) => void;

  beat: string;
  onBeatChange: (value: string) => void;
}

export default function ReporterToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  state,
  onStateChange,
  district,
  onDistrictChange,
  beat,
  onBeatChange,
}: ReporterToolbarProps) {
  function resetFilters() {
    onSearchChange("");
    onStatusChange("");
    onStateChange("");
    onDistrictChange("");
    onBeatChange("");
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="grid gap-4 xl:grid-cols-6">

        {/* Search */}

        <div className="relative xl:col-span-2">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search reporter..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />

        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="SUSPENDED">Suspended</option>
        </select>

        {/* State */}

        <input
          value={state}
          onChange={(e) =>
            onStateChange(e.target.value)
          }
          placeholder="State"
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />

        {/* District */}

        <input
          value={district}
          onChange={(e) =>
            onDistrictChange(e.target.value)
          }
          placeholder="District"
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />

        {/* Beat */}

        <input
          value={beat}
          onChange={(e) =>
            onBeatChange(e.target.value)
          }
          placeholder="Beat"
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />

      </div>

      {/* Footer */}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">

        <p className="text-sm text-slate-500">
          Filter reporters by name, status, state, district or beat.
        </p>

        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-medium transition hover:bg-slate-100"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>

      </div>

    </div>
  );
}