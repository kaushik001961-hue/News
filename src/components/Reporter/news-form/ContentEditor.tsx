"use client";

import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import {
  NewsFormData,
} from "./types";

import {
  calculateReadingTime,
  calculateWordCount,
} from "./helpers";

interface Props {
  register: UseFormRegister<NewsFormData>;
  watch: UseFormWatch<NewsFormData>;
  errors: FieldErrors<NewsFormData>;
}

export default function ContentEditor({
  register,
  watch,
  errors,
}: Props) {
  const content = watch("content") || "";

  const words = calculateWordCount(content);

  const readingTime =
    calculateReadingTime(content);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-xl font-bold">
            Article Content
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Write your complete news story.
          </p>

        </div>

        <div className="flex gap-3">

          <div className="rounded-lg bg-slate-100 px-4 py-2">

            <p className="text-xs text-slate-500">
              Words
            </p>

            <p className="font-bold">
              {words}
            </p>

          </div>

          <div className="rounded-lg bg-slate-100 px-4 py-2">

            <p className="text-xs text-slate-500">
              Reading Time
            </p>

            <p className="font-bold">
              {readingTime} min
            </p>

          </div>

        </div>

      </div>

      {/* Editor */}

      <div className="p-6">

        <textarea
          rows={22}
          placeholder="Write your article here..."
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 100,
              message:
                "Article should contain at least 100 characters.",
            },
          })}
          className="min-h-[550px] w-full rounded-xl border border-slate-300 p-5 leading-8 outline-none transition focus:border-blue-500"
        />

        {errors.content && (

          <p className="mt-3 text-sm text-red-500">
            {errors.content.message}
          </p>

        )}

      </div>

      {/* Footer */}

      <div className="flex flex-wrap gap-4 border-t bg-slate-50 p-5 text-sm text-slate-500">

        <span>
          Word Count:
          <strong className="ml-2 text-slate-800">
            {words}
          </strong>
        </span>

        <span>
          Estimated Reading:
          <strong className="ml-2 text-slate-800">
            {readingTime} min
          </strong>
        </span>

        <span>
          Status:
          <strong className="ml-2 text-green-600">
            Editing
          </strong>
        </span>

      </div>

    </div>
  );
}