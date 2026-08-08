"use client";

import { useTransition } from "react";

import {
  Trash2,
  CheckCircle2,
  XCircle,
  Download,
  X,
} from "lucide-react";

interface BulkCategoryActionsProps {
  selectedIds: string[];
  clearSelection: () => void;

  onDelete?: (ids: string[]) => Promise<void> | void;
  onActivate?: (ids: string[]) => Promise<void> | void;
  onDeactivate?: (ids: string[]) => Promise<void> | void;
  onExport?: (ids: string[]) => Promise<void> | void;
}

export default function BulkCategoryActions({
  selectedIds,
  clearSelection,
  onDelete,
  onActivate,
  onDeactivate,
  onExport,
}: BulkCategoryActionsProps) {
  const [isPending, startTransition] = useTransition();

  if (selectedIds.length === 0) return null;

  function execute(
    action?: (ids: string[]) => Promise<void> | void
  ) {
    if (!action) return;

    startTransition(async () => {
      await action(selectedIds);
    });
  }

  function handleDelete() {
    if (!onDelete) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected categor${
        selectedIds.length > 1 ? "ies" : "y"
      }?`
    );

    if (!confirmed) return;

    execute(onDelete);
  }

  return (
    <div className="sticky top-4 z-20 mb-6 rounded-3xl border border-blue-200 bg-white p-5 shadow-lg">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <div className="flex items-center gap-3">

            <h3 className="text-xl font-bold text-slate-900">
              Bulk Actions
            </h3>

            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              {selectedIds.length} Selected
            </span>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Perform actions on selected categories.
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">

          <button
            disabled={isPending}
            onClick={() => execute(onActivate)}
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              Activate
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={() => execute(onDeactivate)}
            className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <XCircle size={18} />
              Deactivate
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Trash2 size={18} />
              Delete
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={() => execute(onExport)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Download size={18} />
              Export
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={clearSelection}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <X size={18} />
              Clear
            </div>
          </button>

        </div>

      </div>

    </div>
  );
}