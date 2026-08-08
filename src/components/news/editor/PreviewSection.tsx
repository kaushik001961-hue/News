"use client";

import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

import { NewsEditorValues } from "@/types/news";

interface Props {
  form: UseFormReturn<NewsEditorValues>;
}

export default function PreviewSection({
  form,
}: Props) {
  const values = form.watch();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-xl font-bold">
          Live Preview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Preview how this article will appear before publishing.
        </p>

      </div>

      <div className="p-6 space-y-8">

        {/* Featured Image */}

        {values.featuredImage ? (
          <Image
            src={values.featuredImage}
            alt={values.title || "Preview"}
            width={1200}
            height={650}
            className="h-80 w-full rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
            <span className="text-slate-400">
              No Featured Image Selected
            </span>
          </div>
        )}

        {/* Category */}

        {values.categoryId && (
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Category Selected
          </span>
        )}

        {/* Title */}

        <h1 className="text-4xl font-bold leading-tight text-slate-900">
          {values.title || "Article Title"}
        </h1>

        {/* Meta */}

        <div className="flex flex-wrap gap-6 text-sm text-slate-500">

          <span>
            📅{" "}
            {values.publishedAt
              ? new Date(
                  values.publishedAt
                ).toLocaleDateString()
              : "Not Published"}
          </span>

          <span>
            👁 {values.views ?? 0} Views
          </span>

          <span>
            ❤️ {values.likes ?? 0}
          </span>

          <span>
            🔄 {values.shares ?? 0}
          </span>

        </div>

        {/* Homepage Badges */}

        <div className="flex flex-wrap gap-2">

          {values.breaking && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Breaking
            </span>
          )}

          {values.featured && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Featured
            </span>
          )}

          {values.hero && (
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
              Hero
            </span>
          )}

          {values.trending && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
              Trending
            </span>
          )}

          {values.editorsPick && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Editor's Pick
            </span>
          )}

        </div>

        {/* Excerpt */}

        {values.excerpt && (
          <p className="text-lg leading-8 text-slate-600 italic">
            {values.excerpt}
          </p>
        )}

        {/* Content */}

        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{
            __html:
              values.content ||
              "<p>Your article content will appear here...</p>",
          }}
        />

        {/* SEO Preview */}

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">

          <h3 className="mb-4 font-semibold">
            Google Search Preview
          </h3>

          <p className="text-xs text-green-700">
            {values.canonicalUrl ||
              "https://yourdomain.com/news/example"}
          </p>

          <h4 className="mt-1 text-lg font-medium text-blue-700">
            {values.seoTitle ||
              values.title ||
              "SEO Title"}
          </h4>

          <p className="mt-2 text-sm text-slate-600">
            {values.seoDescription ||
              values.excerpt ||
              "Meta description will appear here."}
          </p>

        </div>

      </div>

    </div>
  );
}