"use client";

import { useTransition } from "react";

import {
  CheckCircle2,
  Archive,
  Copy,
  Trash2,
  X,
  Star,
  Flame,
  Download,
} from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;

  onPublish?: () => Promise<void> | void;
  onArchive?: () => Promise<void> | void;
  onDuplicate?: () => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  onFeature?: () => Promise<void> | void;
  onBreaking?: () => Promise<void> | void;
  onExport?: () => Promise<void> | void;
  onClear?: () => void;
}

export default function BulkActions({
  selectedCount,
  onPublish,
  onArchive,
  onDuplicate,
  onDelete,
  onFeature,
  onBreaking,
  onExport,
  onClear,
}: BulkActionsProps) {
  const [isPending, startTransition] = useTransition();

  if (selectedCount === 0) return null;

  function execute(action?: () => Promise<void> | void) {
    if (!action) return;

    startTransition(async () => {
      await action();
    });
  }

  function handleDelete() {
    if (!onDelete) return;

    const confirmed = window.confirm(
      `Delete ${selectedCount} selected article${
        selectedCount > 1 ? "s" : ""
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
              {selectedCount} Selected
            </span>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Perform actions on the selected news articles.
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">

          <button
            disabled={isPending}
            onClick={() => execute(onPublish)}
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              Publish
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={() => execute(onFeature)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Star size={18} />
              Featured
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={() => execute(onBreaking)}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Flame size={18} />
              Breaking
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={() => execute(onArchive)}
            className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Archive size={18} />
              Archive
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={() => execute(onDuplicate)}
            className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Copy size={18} />
              Duplicate
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={handleDelete}
            className="rounded-xl bg-red-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-900 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Trash2 size={18} />
              Delete
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={() => execute(onExport)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Download size={18} />
              Export
            </div>
          </button>

          <button
            disabled={isPending}
            onClick={onClear}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:opacity-50"
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