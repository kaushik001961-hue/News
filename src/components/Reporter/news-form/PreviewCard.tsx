"use client";

import Image from "next/image";
import { UseFormWatch } from "react-hook-form";

import {
  calculateReadingTime,
  calculateWordCount,
} from "./helpers";

import { NewsFormData } from "./types";

interface Props {
  watch: UseFormWatch<NewsFormData>;
  categoryName?: string;
  authorName?: string;
}

export default function PreviewCard({
  watch,
  categoryName,
  authorName = "Reporter",
}: Props) {
  const title = watch("title") || "Article Title";
  const excerpt =
    watch("excerpt") ||
    "Article summary will appear here...";

  const featuredImage = watch("featuredImage");

  const content = watch("content") || "";

  const district = watch("district");
  const state = watch("state");

  const words = calculateWordCount(content);
  const readingTime =
    calculateReadingTime(content);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b p-6">

        <h2 className="text-xl font-bold">
          Live Preview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          This is how your article will appear to readers.
        </p>

      </div>

      {/* Featured Image */}

      <div className="relative h-72 w-full bg-slate-100">

        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No Featured Image
          </div>
        )}

      </div>

      {/* Article */}

      <div className="space-y-5 p-6">

        {/* Category */}

        <div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {categoryName || "Category"}
          </span>

        </div>

        {/* Title */}

        <h1 className="text-3xl font-bold leading-tight">
          {title}
        </h1>

        {/* Summary */}

        <p className="text-slate-600">
          {excerpt}
        </p>

        {/* Meta */}

        <div className="flex flex-wrap gap-5 border-t border-b py-4 text-sm text-slate-500">

          <div>
            <strong>Author:</strong> {authorName}
          </div>

          <div>
            <strong>Words:</strong> {words}
          </div>

          <div>
            <strong>Reading:</strong> {readingTime} min
          </div>

          <div>
            <strong>Status:</strong> Draft
          </div>

        </div>

        {/* Location */}

        {(district || state) && (
          <div className="rounded-xl bg-slate-50 p-4">

            <div className="font-semibold">
              News Location
            </div>

            <div className="mt-2 text-slate-600">
              {[district, state]
                .filter(Boolean)
                .join(", ")}
            </div>

          </div>
        )}

        {/* Content Preview */}

        <div>

          <h3 className="mb-3 text-lg font-semibold">
            Content Preview
          </h3>

          <div className="prose prose-slate max-w-none rounded-xl bg-slate-50 p-5">

            {content ? (
              <p className="whitespace-pre-wrap">
                {content.length > 600
                  ? content.substring(0, 600) + "..."
                  : content}
              </p>
            ) : (
              <p className="text-slate-400">
                Start writing your article...
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}