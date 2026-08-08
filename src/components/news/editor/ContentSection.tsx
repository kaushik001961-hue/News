"use client";

import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

import { NewsEditorValues } from "@/types/news";

// Replace this with your existing RichTextEditor component
// Example:
// import RichTextEditor from "@/components/editor/RichTextEditor";

interface Props {
  form: UseFormReturn<NewsEditorValues>;
}

export default function ContentSection({
  form,
}: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const content = watch("content") ?? "";

  const stats = useMemo(() => {
    const text = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const words =
      text.length === 0
        ? 0
        : text.split(" ").length;

    const characters = text.length;

    const readingTime = Math.max(
      1,
      Math.ceil(words / 200)
    );

    return {
      words,
      characters,
      readingTime,
    };
  }, [content]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Article Content
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Write your complete news story.
            </p>

          </div>

          <div className="flex gap-6 text-center">

            <div>
              <p className="text-xl font-bold">
                {stats.words}
              </p>

              <p className="text-xs text-slate-500">
                Words
              </p>
            </div>

            <div>
              <p className="text-xl font-bold">
                {stats.characters}
              </p>

              <p className="text-xs text-slate-500">
                Characters
              </p>
            </div>

            <div>
              <p className="text-xl font-bold">
                {stats.readingTime}
              </p>

              <p className="text-xs text-slate-500">
                Min Read
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="p-6">

        {/* ---------- TEMP TEXTAREA ---------- */}

        {/* Replace this with your RichTextEditor */}

        <textarea
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 200,
              message:
                "Article should contain at least 200 characters.",
            },
          })}
          rows={20}
          placeholder="Write your news article..."
          className="w-full rounded-xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
        />

        {/* ---------- RichTextEditor Example ---------- */}

        {/*
        <RichTextEditor
            value={content}
            onChange={(value)=>
                setValue("content", value)
            }
        />
        */}

        <p className="mt-2 text-sm text-red-500">
          {errors.content?.message}
        </p>

      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4">

        <div className="flex flex-wrap gap-2 text-sm">

          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
            Minimum 200 characters
          </span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
            Reading Time: {stats.readingTime} min
          </span>

          <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">
            {stats.words} Words
          </span>

        </div>

      </div>

    </div>
  );
}