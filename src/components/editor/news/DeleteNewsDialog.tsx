"use client";

import {
  AlertTriangle,
  Loader2,
} from "lucide-react";

interface DeleteDialogProps {
  open: boolean;
  title: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  title,
  loading = false,
  onCancel,
  onConfirm,
}: DeleteDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="border-b border-slate-200 p-6">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

            <AlertTriangle
              size={42}
              className="text-red-600"
            />

          </div>

          <h2 className="mt-5 text-center text-2xl font-bold text-slate-900">
            Delete News
          </h2>

          <p className="mt-3 text-center text-slate-500">
            Are you sure you want to delete
          </p>

          <p className="mt-2 text-center font-semibold text-slate-900">
            "{title}"
          </p>

          <p className="mt-4 text-center text-sm text-red-600">
            This action cannot be undone.
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 p-6">

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-5 py-2 font-medium hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            Delete
          </button>

        </div>

      </div>

    </div>
  );
}