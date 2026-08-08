"use client";

import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { NewsFormData } from "./types";

interface Props {
  register: UseFormRegister<NewsFormData>;
  watch: UseFormWatch<NewsFormData>;
  errors: FieldErrors<NewsFormData>;
}

export default function SEOSection({
  register,
  watch,
  errors,
}: Props) {
  const title = watch("seoTitle") || "";
  const description = watch("seoDescription") || "";
  const keywords = watch("seoKeywords") || "";

  const titleLength = title.length;
  const descriptionLength = description.length;

  const titleColor =
    titleLength > 60
      ? "text-red-500"
      : titleLength > 50
      ? "text-amber-500"
      : "text-green-600";

  const descriptionColor =
    descriptionLength > 160
      ? "text-red-500"
      : descriptionLength > 140
      ? "text-amber-500"
      : "text-green-600";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b p-6">

        <h2 className="text-xl font-bold">
          SEO Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Optimize this article for Google and other search engines.
        </p>

      </div>

      {/* Body */}

      <div className="space-y-6 p-6">

        {/* SEO Title */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <label className="font-semibold">
              SEO Title
            </label>

            <span className={`text-xs ${titleColor}`}>
              {titleLength}/60
            </span>

          </div>

          <input
            {...register("seoTitle")}
            placeholder="SEO Title"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          {errors.seoTitle && (
            <p className="mt-2 text-sm text-red-500">
              {errors.seoTitle.message}
            </p>
          )}

        </div>

        {/* Meta Description */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <label className="font-semibold">
              Meta Description
            </label>

            <span className={`text-xs ${descriptionColor}`}>
              {descriptionLength}/160
            </span>

          </div>

          <textarea
            rows={4}
            {...register("seoDescription")}
            placeholder="Meta Description"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Keywords */}

        <div>

          <label className="mb-2 block font-semibold">
            Focus Keywords
          </label>

          <input
            {...register("seoKeywords")}
            placeholder="Politics, Gujarat, Election"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <p className="mt-2 text-xs text-slate-500">
            Separate keywords with commas.
          </p>

        </div>

      </div>

      {/* Google Preview */}

      <div className="border-t bg-slate-50 p-6">

        <h3 className="mb-4 font-semibold">
          Google Search Preview
        </h3>

        <div className="rounded-xl border bg-white p-5">

          <div className="text-xl text-blue-700 hover:underline">
            {title || "SEO Title Preview"}
          </div>

          <div className="mt-1 text-sm text-green-700">
            https://yournewsportal.com/news/article-slug
          </div>

          <p className="mt-2 text-sm text-slate-600">
            {description ||
              "Your meta description will appear here in Google search results."}
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-4">

        <div className="flex flex-wrap gap-6 text-sm">

          <div>

            <span className="font-medium">
              Keywords:
            </span>

            <span className="ml-2 text-slate-600">
              {keywords || "-"}
            </span>

          </div>

          <div>

            <span className="font-medium">
              SEO Status:
            </span>

            <span className="ml-2 text-green-600 font-semibold">
              Ready
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}