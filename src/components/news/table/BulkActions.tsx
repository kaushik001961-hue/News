"use client";

import {
  Archive,
  Trash2,
  Star,
  Flame,
  CheckCircle2,
  X,
} from "lucide-react";

interface Props {
  selectedCount: number;

  onPublish: () => void;
  onArchive: () => void;
  onFeature: () => void;
  onBreaking: () => void;
  onDelete: () => void;

  onClear: () => void;
}

export default function BulkActions({
  selectedCount,
  onPublish,
  onArchive,
  onFeature,
  onBreaking,
  onDelete,
  onClear,
}: Props) {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 p-4">

      <div className="font-semibold">
        {selectedCount} selected
      </div>

      <div className="flex flex-wrap gap-2">

        <button onClick={onPublish} className="rounded-lg bg-green-600 px-3 py-2 text-white">
          <CheckCircle2 size={16} className="inline mr-2" />
          Publish
        </button>

        <button onClick={onArchive} className="rounded-lg bg-purple-600 px-3 py-2 text-white">
          <Archive size={16} className="inline mr-2" />
          Archive
        </button>

        <button onClick={onFeature} className="rounded-lg bg-blue-600 px-3 py-2 text-white">
          <Star size={16} className="inline mr-2" />
          Feature
        </button>

        <button onClick={onBreaking} className="rounded-lg bg-orange-600 px-3 py-2 text-white">
          <Flame size={16} className="inline mr-2" />
          Breaking
        </button>

        <button onClick={onDelete} className="rounded-lg bg-red-600 px-3 py-2 text-white">
          <Trash2 size={16} className="inline mr-2" />
          Delete
        </button>

        <button onClick={onClear} className="rounded-lg border px-3 py-2">
          <X size={16} className="inline mr-2" />
          Clear
        </button>

      </div>

    </div>
  );
}