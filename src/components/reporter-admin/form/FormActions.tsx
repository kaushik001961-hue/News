"use client";

interface Props {
  loading?: boolean;
}

export default function FormActions({
  loading = false,
}: Props) {
  return (
    <div className="flex justify-end gap-4">

      <button
        type="button"
        className="rounded-xl border border-slate-300 px-6 py-3"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Reporter"}
      </button>

    </div>
  );
}