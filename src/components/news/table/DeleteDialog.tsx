"use client";

interface Props {
  open: boolean;
  title: string;
  loading?: boolean;

  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  title,
  loading,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="text-xl font-bold">
          Delete Article
        </h2>

        <p className="mt-4 text-slate-600">
          Are you sure you want to delete
          <strong> "{title}"</strong>?
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2 text-white disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}