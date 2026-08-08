"use client";

import { Save, Send, Calendar, Eye } from "lucide-react";

interface PublishPanelProps {
  status: string;
  publishDate?: string;

  onStatusChange: (status: string) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onPreview: () => void;
}

export default function PublishPanel({
  status,
  publishDate,
  onStatusChange,
  onSaveDraft,
  onPublish,
  onPreview,
}: PublishPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-bold text-slate-800">
          Publish
        </h2>
      </div>

      {/* Content */}

      <div className="space-y-5 p-5">

        {/* Status */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          >
            <option value="DRAFT">
              Draft
            </option>

            <option value="PENDING">
              Pending Review
            </option>

            <option value="PUBLISHED">
              Published
            </option>

          </select>

        </div>

        {/* Publish Date */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Publish Date
          </label>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3">

            <Calendar size={18} />

            <span className="text-sm text-slate-600">
              {publishDate || "Immediately"}
            </span>

          </div>

        </div>

        {/* Buttons */}

        <button
          onClick={onSaveDraft}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 font-medium hover:bg-slate-50"
        >
          <Save size={18} />

          Save Draft
        </button>

        <button
          onClick={onPreview}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-300 py-3 font-medium text-blue-600 hover:bg-blue-50"
        >
          <Eye size={18} />

          Preview
        </button>

        <button
          onClick={onPublish}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Send size={18} />

          Publish News
        </button>

      </div>

    </div>
  );
}