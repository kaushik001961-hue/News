"use client";

import { useTransition } from "react";

import {
  Trash2,
  Download,
  Copy,
  FolderOpen,
  X,
  CheckSquare,
} from "lucide-react";

interface BulkMediaActionsProps {
  selectedIds: string[];

  clearSelection: () => void;

  onDelete?: (ids: string[]) => Promise<void> | void;

  onDownload?: (ids: string[]) => Promise<void> | void;

  onCopyUrls?: (ids: string[]) => Promise<void> | void;

  onMove?: (ids: string[]) => Promise<void> | void;
}

export default function BulkMediaActions({
  selectedIds,
  clearSelection,
  onDelete,
  onDownload,
  onCopyUrls,
  onMove,
}: BulkMediaActionsProps) {
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
      `Delete ${selectedIds.length} selected file${
        selectedIds.length > 1 ? "s" : ""
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

            <CheckSquare
              size={22}
              className="text-blue-600"
            />

            <h3 className="text-xl font-bold">
              {selectedIds.length} Selected
            </h3>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Perform bulk operations on selected media.
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">

          <button
            disabled={isPending}
            onClick={() => execute(onDownload)}
            className="rounded-xl border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Download size={18} />
              Download
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={() => execute(onCopyUrls)}
            className="rounded-xl border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Copy size={18} />
              Copy URLs
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={() => execute(onMove)}
            className="rounded-xl border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <FolderOpen size={18} />
              Move
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Trash2 size={18} />
              Delete
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={clearSelection}
            className="rounded-xl border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100 disabled:opacity-50"
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