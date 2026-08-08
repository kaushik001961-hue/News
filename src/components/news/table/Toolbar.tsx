"use client";

import Link from "next/link";

import {
  Plus,
  RefreshCw,
} from "lucide-react";

import SearchBar from "./SearchBar";
import StatusFilter, {
  NewsStatus,
} from "./StatusFilter";
import ExportButton from "./ExportButton";

interface ToolbarProps {
  total: number;

  search: string;
  status: NewsStatus;

  createUrl: string;

  loading?: boolean;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: NewsStatus) => void;

  onRefresh?: () => void;
}

export default function Toolbar({
  total,
  search,
  status,
  createUrl,
  loading = false,
  onSearchChange,
  onStatusChange,
  onRefresh,
}: ToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            News Management
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {total.toLocaleString()} article
            {total !== 1 ? "s" : ""} found
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">

          <SearchBar
            value={search}
            onChange={onSearchChange}
          />

          <StatusFilter
            value={status}
            onChange={onStatusChange}
          />

          <ExportButton
            onExportCSV={() => {}}
            onExportExcel={() => {}}
            onExportPDF={() => {}}
          />

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium transition hover:bg-slate-100 disabled:opacity-50"
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
              Refresh
            </button>
          )}

          <Link
            href={createUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create News
          </Link>

        </div>

      </div>

    </div>
  );
}