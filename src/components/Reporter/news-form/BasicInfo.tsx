"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { NewsFormData } from "./types";

interface Props {
  register: UseFormRegister<NewsFormData>;
  errors: FieldErrors<NewsFormData>;
}

export default function BasicInfo({
  register,
  errors,
}: Props) {
  return (
    <div className="space-y-6">

      <div>

        <label className="block mb-2 font-semibold">
          Title
        </label>

        <input
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full rounded-xl border px-4 py-3"
        />

        {errors.title && (
          <p className="mt-2 text-red-500 text-sm">
            {errors.title.message}
          </p>
        )}

      </div>

      <div>

        <label className="block mb-2 font-semibold">
          Slug
        </label>

        <input
          {...register("slug")}
          className="w-full rounded-xl border bg-slate-100 px-4 py-3"
        />

      </div>

      <div>

        <label className="block mb-2 font-semibold">
          Summary
        </label>

        <textarea
          rows={4}
          {...register("excerpt", {
            required: "Summary is required",
          })}
          className="w-full rounded-xl border px-4 py-3"
        />

        {errors.excerpt && (
          <p className="mt-2 text-red-500 text-sm">
            {errors.excerpt.message}
          </p>
        )}

      </div>

    </div>
  );
}