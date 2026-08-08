"use client";

interface Props {
  loading: boolean;
  mode: "create" | "edit";
  onCancel: () => void;
  onSaveDraft: () => void;
  onSubmitReview: () => void;
}

export default function PublishSection({
  loading,
  mode,
  onCancel,
  onSaveDraft,
  onSubmitReview,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b p-6">

        <h2 className="text-xl font-bold">
          Publish Article
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose whether to save your work as a draft or send it to the editor for review.
        </p>

      </div>

      {/* Information */}

      <div className="space-y-4 p-6">

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

          <h3 className="font-semibold text-amber-700">
            Save as Draft
          </h3>

          <p className="mt-2 text-sm text-amber-700">
            Your article remains private and can be edited later.
          </p>

        </div>

        <div className="rounded-xl border border-green-200 bg-green-50 p-4">

          <h3 className="font-semibold text-green-700">
            Submit for Review
          </h3>

          <p className="mt-2 text-sm text-green-700">
            Your editor will review the article before publication.
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="flex flex-col gap-4 border-t bg-slate-50 p-6 md:flex-row md:justify-end">

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onSaveDraft}
          disabled={loading}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold hover:bg-slate-100 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Draft"}
        </button>

        <button
          type="button"
          onClick={onSubmitReview}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : mode === "create"
            ? "Submit for Review"
            : "Update Article"}
        </button>

      </div>

    </div>
  );
}