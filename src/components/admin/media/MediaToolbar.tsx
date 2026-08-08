"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Upload,
  FolderPlus,
  RefreshCw,
  Download,
  Trash2,
  Grid2X2,
  List,
} from "lucide-react";

interface MediaToolbarProps {
  view?: "grid" | "list";
  onViewChange?: (view: "grid" | "list") => void;
}

export default function MediaToolbar({
  view = "grid",
  onViewChange,
}: MediaToolbarProps) {
  const router = useRouter();

  function refresh() {
    router.refresh();
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-wrap gap-3">

          <Link
            href="/admin/media/upload"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            <Upload size={18} />
            Upload Media
          </Link>

          <Link
            href="/admin/media/folders"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 hover:bg-slate-100"
          >
            <FolderPlus size={18} />
            Folders
          </Link>

          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 hover:bg-slate-100"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 hover:bg-slate-100"
          >
            <Download size={18} />
            Export
          </button>

          <Link
            href="/admin/media/trash"
            className="inline-flex items-center gap-2 rounded-xl border border-red-300 px-5 py-2.5 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
            Trash
          </Link>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <div className="overflow-hidden rounded-xl border border-slate-300">

            <button
              onClick={() =>
                onViewChange?.("grid")
              }
              className={`p-3 ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              <Grid2X2 size={18} />
            </button>

            <button
              onClick={() =>
                onViewChange?.("list")
              }
              className={`p-3 ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              <List size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}