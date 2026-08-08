"use client";

import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { Category, NewsFormData } from "./types";

interface Props {
  categories: Category[];
  register: UseFormRegister<NewsFormData>;
  errors: FieldErrors<NewsFormData>;
}

export default function CategorySection({
  categories,
  register,
  errors,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Category & Tags
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the category and add relevant tags for better
          organization and search.
        </p>
      </div>

      <div className="space-y-6">

        {/* Category */}

        <div>

          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            {...register("categoryId", {
              required: "Please select a category",
            })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="mt-2 text-sm text-red-500">
              {errors.categoryId.message}
            </p>
          )}

        </div>

        {/* Tags */}

        <div>

          <label className="mb-2 block font-semibold">
            Tags
          </label>

          <input
            {...register("tags")}
            placeholder="Politics, Gujarat, Election"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          <p className="mt-2 text-xs text-slate-500">
            Separate multiple tags using commas.
          </p>

        </div>

      </div>

    </div>
  );
}