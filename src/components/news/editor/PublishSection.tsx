"use client";

import { Calendar, Clock, Eye, FileCheck2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { NewsEditorValues, NewsStatus } from "@/types/news";

interface Props {
  form: UseFormReturn<NewsEditorValues>;
  role: "ADMIN" | "EDITOR" | "REPORTER";
}

const STATUS_OPTIONS: {
  value: NewsStatus;
  label: string;
}[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "PENDING", label: "Pending Review" },
  { value: "PUBLISHED", label: "Published" },
  { value: "REJECTED", label: "Rejected" },
  { value: "ARCHIVED", label: "Archived" },
];

export default function PublishSection({
  form,
  role,
}: Props) {
  const { register, watch, setValue } = form;

  const status = watch("status");
  const publishedAt = watch("publishedAt");

  function canPublish() {
    return role === "ADMIN" || role === "EDITOR";
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-xl font-bold">
          Publishing
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Control publication workflow.
        </p>

      </div>

      <div className="space-y-6 p-6">

        {/* Status */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select
            {...register("status")}
            disabled={!canPublish()}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:bg-slate-100"
          >
            {STATUS_OPTIONS.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>

          {!canPublish() && (
            <p className="mt-2 text-xs text-orange-600">
              Reporters can only submit articles for review.
            </p>
          )}

        </div>

        {/* Publish Date */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium">

            <Calendar size={16} />

            Publish Date

          </label>

          <input
            type="datetime-local"
            value={
              publishedAt
                ? new Date(publishedAt)
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) =>
              setValue(
                "publishedAt",
                e.target.value
                  ? new Date(e.target.value)
                  : null
              )
            }
            disabled={!canPublish()}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:bg-slate-100"
          />

        </div>

        {/* Summary */}

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

          <h3 className="mb-4 flex items-center gap-2 font-semibold">

            <Eye size={18} />

            Publication Summary

          </h3>

          <div className="grid gap-3 text-sm md:grid-cols-2">

            <div className="flex justify-between">
              <span>Status</span>

              <strong>{status}</strong>
            </div>

            <div className="flex justify-between">
              <span>Featured</span>

              <strong>
                {watch("featured") ? "Yes" : "No"}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Breaking</span>

              <strong>
                {watch("breaking") ? "Yes" : "No"}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Trending</span>

              <strong>
                {watch("trending") ? "Yes" : "No"}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Hero</span>

              <strong>
                {watch("hero") ? "Yes" : "No"}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Editor's Pick</span>

              <strong>
                {watch("editorsPick")
                  ? "Yes"
                  : "No"}
              </strong>
            </div>

          </div>

        </div>

        {/* Workflow */}

        <div className="rounded-xl bg-blue-50 p-5">

          <div className="flex items-center gap-2 font-semibold text-blue-700">

            <FileCheck2 size={18} />

            Workflow

          </div>

          <div className="mt-4 space-y-2 text-sm">

            {role === "REPORTER" && (
              <>
                <p>✓ Save Draft</p>
                <p>✓ Submit for Review</p>
                <p>✗ Publish</p>
              </>
            )}

            {role === "EDITOR" && (
              <>
                <p>✓ Review News</p>
                <p>✓ Approve</p>
                <p>✓ Publish</p>
              </>
            )}

            {role === "ADMIN" && (
              <>
                <p>✓ Full Control</p>
                <p>✓ Publish</p>
                <p>✓ Archive</p>
              </>
            )}

          </div>

        </div>

        {/* Schedule Info */}

        {publishedAt && (

          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">

            <Clock size={18} />

            Scheduled for{" "}
            {new Date(
              publishedAt
            ).toLocaleString()}

          </div>

        )}

      </div>

    </div>
  );
}