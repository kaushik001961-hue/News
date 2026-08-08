"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

export default function PressCardFilters() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [expiry, setExpiry] = useState("ALL");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Search */}

        <div className="relative w-full xl:max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search reporter, card number..."
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              py-3
              pl-11
              pr-4
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-3">

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              font-medium
              outline-none
              transition
              focus:border-blue-500
            "
          >
            <option value="ALL">
              All Status
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="EXPIRED">
              Expired
            </option>

            <option value="INACTIVE">
              Inactive
            </option>

          </select>

          <select
            value={expiry}
            onChange={(e) =>
              setExpiry(e.target.value)
            }
            className="
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              font-medium
              outline-none
              transition
              focus:border-blue-500
            "
          >
            <option value="ALL">
              All Expiry
            </option>

            <option value="30">
              Next 30 Days
            </option>

            <option value="60">
              Next 60 Days
            </option>

            <option value="90">
              Next 90 Days
            </option>

          </select>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-300
              bg-white
              px-5
              py-3
              font-semibold
              transition
              hover:bg-slate-100
            "
          >
            <Filter size={18} />
            Filter
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-semibold
              text-white
              shadow-lg
              transition
              hover:bg-blue-700
            "
          >
            <Download size={18} />
            Export
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-emerald-600
              px-5
              py-3
              font-semibold
              text-white
              shadow-lg
              transition
              hover:bg-emerald-700
            "
          >
            <RefreshCw size={18} />
            Refresh
          </button>

        </div>

      </div>

      {/* Active Filter Chips */}

      <div className="mt-6 flex flex-wrap gap-2">

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Active
        </span>

        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
          Valid
        </span>

        <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
          Expiring Soon
        </span>

      </div>

    </div>
  );
}