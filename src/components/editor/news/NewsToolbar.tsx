"use client";

import Link from "next/link";
import { useTransition } from "react";

import {
  Plus,
  RefreshCw,
  Upload,
  Download,
  LayoutGrid,
  Table2,
  Settings2,
} from "lucide-react";

interface NewsToolbarProps {
  onRefresh?: () => Promise<void> | void;
  onImport?: () => void;
  onExport?: () => void;
  view?: "table" | "grid";
  onViewChange?: (view: "table" | "grid") => void;
}

export default function NewsToolbar({
  onRefresh,
  onImport,
  onExport,
  view = "table",
  onViewChange,
}: NewsToolbarProps) {
  const [isPending, startTransition] = useTransition();

  function handleRefresh() {
    if (!onRefresh) return;

    startTransition(async () => {
      await onRefresh();
    });
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-wrap gap-3">

          <Link
            href="/editor/news/create"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create News
          </Link>

          <button
            onClick={handleRefresh}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100 disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={isPending ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            onClick={onImport}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100"
          >
            <Upload size={18} />
            Import
          </button>

          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100"
          >
            <Download size={18} />
            Export
          </button>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <div className="flex overflow-hidden rounded-xl border border-slate-300">

            <button
              onClick={() => onViewChange?.("table")}
              className={`p-2 transition ${
                view === "table"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
              title="Table View"
            >
              <Table2 size={18} />
            </button>

            <button
              onClick={() => onViewChange?.("grid")}
              className={`p-2 transition ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>

          </div>

          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100"
            title="Column Settings"
          >
            <Settings2 size={18} />
            Columns
          </button>

        </div>

      </div>

    </div>
  );
}