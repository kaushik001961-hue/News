"use client";

import { useSession } from "next-auth/react";

interface PublishActionsProps {
  onSaveDraft: () => void;
  onSubmitForReview?: () => void;
  onApproveByEditor?: () => void;
  onPublish: () => void;
  onReject?: () => void;
  onDelete?: () => void;
  loading?: boolean;
  editMode?: boolean;
}

export default function PublishActions({
  onSaveDraft,
  onSubmitForReview,
  onApproveByEditor,
  onPublish,
  onReject,
  onDelete,
  loading = false,
  editMode = false,
}: PublishActionsProps) {
  const { data: session } = useSession();

  const role = session?.user?.role;

  return (
    <div className="flex flex-wrap gap-4">

      {/* ================= REPORTER ================= */}

      {role === "REPORTER" && (
        <>
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={loading}
            className="rounded-lg bg-gray-800 px-6 py-3 text-white hover:bg-gray-900 disabled:opacity-50"
          >
            {editMode ? "Update Draft" : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={onSubmitForReview}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Submit for Review
          </button>
        </>
      )}

      {/* ================= EDITOR ================= */}

      {role === "EDITOR" && (
        <>
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={loading}
            className="rounded-lg bg-gray-800 px-6 py-3 text-white hover:bg-gray-900 disabled:opacity-50"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={onApproveByEditor}
            disabled={loading}
            className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            Approve & Send to Admin
          </button>

          <button
            type="button"
            onClick={onReject}
            disabled={loading}
            className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:opacity-50"
          >
            Reject
          </button>
        </>
      )}

      {/* ================= ADMIN ================= */}

      {role === "ADMIN" && (
        <>
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={loading}
            className="rounded-lg bg-gray-800 px-6 py-3 text-white hover:bg-gray-900 disabled:opacity-50"
          >
            Save
          </button>

          <button
            type="button"
            onClick={onPublish}
            disabled={loading}
            className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            Publish
          </button>

          <button
            type="button"
            onClick={onReject}
            disabled={loading}
            className="rounded-lg bg-yellow-600 px-6 py-3 text-white hover:bg-yellow-700 disabled:opacity-50"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={loading}
            className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:opacity-50"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}