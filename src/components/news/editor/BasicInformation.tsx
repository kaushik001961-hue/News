"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import { NewsEditorValues } from "@/types/news";

interface Props {
  form: UseFormReturn<NewsEditorValues>;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BasicInformation({
  form,
}: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const title = watch("title");
  const slug = watch("slug");
  const excerpt = watch("excerpt");

  useEffect(() => {
    if (!slug && title) {
      setValue("slug", generateSlug(title), {
        shouldValidate: true,
      });
    }
  }, [title, slug, setValue]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the main details of the news article.
        </p>
      </div>

      <div className="space-y-6">

        {/* Title */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            News Title
          </label>

          <input
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 10,
                message:
                  "Title should be at least 10 characters.",
              },
            })}
            placeholder="Enter headline..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          <div className="mt-1 flex justify-between text-xs">
            <span className="text-red-500">
              {errors.title?.message}
            </span>

            <span className="text-slate-400">
              {title?.length ?? 0} / 120
            </span>
          </div>
        </div>

        {/* Slug */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            URL Slug
          </label>

          <input
            {...register("slug", {
              required: "Slug is required",
            })}
            placeholder="auto-generated-slug"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-slate-500">
            Example:
            <span className="ml-1 font-medium">
              /news/{slug || "your-news-slug"}
            </span>
          </p>

          <p className="mt-1 text-xs text-red-500">
            {errors.slug?.message}
          </p>
        </div>

        {/* Excerpt */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Short Description
          </label>

          <textarea
            {...register("excerpt")}
            rows={4}
            maxLength={300}
            placeholder="Write a short summary..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          <div className="mt-1 text-right text-xs text-slate-400">
            {excerpt?.length ?? 0} / 300
          </div>
        </div>

      </div>
    </div>
  );
}