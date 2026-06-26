"use client";

interface PublishActionsProps {
  onSaveDraft: () => void;
  onPublish: () => void;
  loading?: boolean;
  editMode?: boolean;
}

export default function PublishActions({
  onSaveDraft,
  onPublish,
  loading = false,
  editMode = false,
}: PublishActionsProps) {
  return (
    <div className="flex justify-end gap-4 border-t pt-6 mt-8">
      <button
        type="button"
        onClick={onSaveDraft}
        disabled={loading}
        className="rounded-lg bg-gray-200 px-6 py-3 hover:bg-gray-300 disabled:opacity-50"
      >
        {editMode ? "Update Draft" : "Save Draft"}
      </button>

      <button
        type="button"
        onClick={onPublish}
        disabled={loading}
        className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {editMode ? "Update & Publish" : "Publish"}
      </button>
    </div>
  );
}