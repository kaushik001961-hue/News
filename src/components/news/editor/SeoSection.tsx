"use client";

import { UseFormReturn } from "react-hook-form";
import { NewsEditorValues } from "@/types/news";

interface Props {
  form: UseFormReturn<NewsEditorValues>;
}

export default function SeoSection({
  form,
}: Props) {
  const {
    register,
    watch,
  } = form;

  const seoTitle = watch("seoTitle") ?? "";
  const seoDescription = watch("seoDescription") ?? "";
  const seoKeywords = watch("seoKeywords") ?? "";
  const canonicalUrl = watch("canonicalUrl") ?? "";
  const focusKeyword = watch("focusKeyword") ?? "";

  const titleScore =
    seoTitle.length >= 30 &&
    seoTitle.length <= 60;

  const descScore =
    seoDescription.length >= 120 &&
    seoDescription.length <= 160;

  const keywordScore =
    focusKeyword.trim().length > 0;

  const seoScore =
    Number(titleScore) +
    Number(descScore) +
    Number(keywordScore);

  const scorePercent = Math.round(
    (seoScore / 3) * 100
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              SEO Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Optimize your article for search engines.
            </p>

          </div>

          <div className="text-right">

            <p className="text-3xl font-bold text-green-600">
              {scorePercent}%
            </p>

            <p className="text-sm text-slate-500">
              SEO Score
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-6 p-6">

        {/* SEO Title */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            SEO Title
          </label>

          <input
            {...register("seoTitle")}
            placeholder="SEO Title"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

          <div className="mt-1 flex justify-between text-xs">

            <span
              className={
                titleScore
                  ? "text-green-600"
                  : "text-orange-500"
              }
            >
              Recommended 30–60 characters
            </span>

            <span>
              {seoTitle.length}/60
            </span>

          </div>

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Meta Description
          </label>

          <textarea
            {...register("seoDescription")}
            rows={4}
            maxLength={160}
            placeholder="Meta Description"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

          <div className="mt-1 flex justify-between text-xs">

            <span
              className={
                descScore
                  ? "text-green-600"
                  : "text-orange-500"
              }
            >
              Recommended 120–160 characters
            </span>

            <span>
              {seoDescription.length}/160
            </span>

          </div>

        </div>

        {/* Focus Keyword */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Focus Keyword
          </label>

          <input
            {...register("focusKeyword")}
            placeholder="Focus Keyword"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>

        {/* Keywords */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            SEO Keywords
          </label>

          <textarea
            {...register("seoKeywords")}
            rows={3}
            placeholder="keyword1, keyword2, keyword3"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

          <p className="mt-2 text-xs text-slate-500">
            Separate keywords using commas.
          </p>

        </div>

        {/* Canonical */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Canonical URL
          </label>

          <input
            {...register("canonicalUrl")}
            placeholder="https://example.com/news/..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>

      </div>

      {/* Google Preview */}

      <div className="border-t border-slate-200 bg-slate-50 p-6">

        <h3 className="mb-4 font-semibold">
          Google Search Preview
        </h3>

        <div className="rounded-xl border border-slate-200 bg-white p-5">

          <p className="text-xs text-green-700">
            {canonicalUrl ||
              "https://yourdomain.com/news/example"}
          </p>

          <h4 className="mt-1 text-lg font-medium text-blue-700">

            {seoTitle ||
              "SEO Title Preview"}

          </h4>

          <p className="mt-2 text-sm text-slate-600">

            {seoDescription ||
              "Your meta description will appear here..."}

          </p>

        </div>

      </div>

    </div>
  );
}