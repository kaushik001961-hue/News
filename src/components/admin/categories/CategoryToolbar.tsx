"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Plus,
  RefreshCw,
  Upload,
  Download,
  FolderTree,
} from "lucide-react";

export default function CategoryToolbar() {
  const router = useRouter();

  function refreshPage() {
    router.refresh();
  }

  function exportCategories() {
    alert("Export Categories - Coming Soon");
  }

  function importCategories() {
    alert("Import Categories - Coming Soon");
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Category Management
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create, organize and manage all news categories.
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">

          <Link
            href="/admin/categories/create"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Category
          </Link>

          <button
            onClick={refreshPage}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={importCategories}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100"
          >
            <Upload size={18} />
            Import
          </button>

          <button
            onClick={exportCategories}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100"
          >
            <Download size={18} />
            Export
          </button>

          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-100"
          >
            <FolderTree size={18} />
            Tree View
          </button>

        </div>

      </div>

    </div>
  );
}