"use client";

import { UseFormReturn } from "react-hook-form";
import {
  CategoryOption,
  NewsEditorValues,
} from "@/types/news";

interface Props {
  form: UseFormReturn<NewsEditorValues>;
  categories: CategoryOption[];
}

export default function CategorySection({
  form,
  categories,
}: Props) {
  const {
    register,
    watch,
    setValue,
  } = form;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Category & Homepage
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select category and homepage visibility.
        </p>
      </div>

      {/* Category */}

      <div className="mb-8">

        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          {...register("categoryId", {
            required: "Category is required",
          })}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
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

      </div>

      {/* Homepage Settings */}

      <div className="grid gap-5 md:grid-cols-2">

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">

          <div>
            <h3 className="font-semibold">
              Breaking News
            </h3>

            <p className="text-sm text-slate-500">
              Show in Breaking News ticker
            </p>
          </div>

          <input
            type="checkbox"
            checked={watch("breaking")}
            onChange={(e) =>
              setValue(
                "breaking",
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </label>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">

          <div>
            <h3 className="font-semibold">
              Featured
            </h3>

            <p className="text-sm text-slate-500">
              Display as featured article
            </p>
          </div>

          <input
            type="checkbox"
            checked={watch("featured")}
            onChange={(e) =>
              setValue(
                "featured",
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </label>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">

          <div>
            <h3 className="font-semibold">
              Hero Slider
            </h3>

            <p className="text-sm text-slate-500">
              Show in homepage hero
            </p>
          </div>

          <input
            type="checkbox"
            checked={watch("hero")}
            onChange={(e) =>
              setValue(
                "hero",
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </label>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">

          <div>
            <h3 className="font-semibold">
              Trending
            </h3>

            <p className="text-sm text-slate-500">
              Add to Trending News
            </p>
          </div>

          <input
            type="checkbox"
            checked={watch("trending")}
            onChange={(e) =>
              setValue(
                "trending",
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </label>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 md:col-span-2">

          <div>
            <h3 className="font-semibold">
              Editor's Pick
            </h3>

            <p className="text-sm text-slate-500">
              Highlight this article as Editor's Pick
            </p>
          </div>

          <input
            type="checkbox"
            checked={watch("editorsPick")}
            onChange={(e) =>
              setValue(
                "editorsPick",
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </label>

      </div>

    </div>
  );
}