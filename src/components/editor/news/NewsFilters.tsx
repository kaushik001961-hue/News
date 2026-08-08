"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, RotateCcw } from "lucide-react";

interface NewsFiltersProps {
  categories: {
    id: string;
    name: string;
  }[];

  reporters: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
}

export default function NewsFilters({
  categories,
  reporters,
}: NewsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/editor/news?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/editor/news");
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-2">

        <Filter className="text-blue-600" size={22} />

        <h2 className="text-lg font-bold">
          Filters
        </h2>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            defaultValue={
              searchParams.get("search") ?? ""
            }
            placeholder="Search news..."
            className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-3 outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParam(
                  "search",
                  e.currentTarget.value
                );
              }
            }}
          />

        </div>

        {/* Status */}

        <select
          className="rounded-xl border border-slate-300 px-3 py-2"
          defaultValue={
            searchParams.get("status") ?? ""
          }
          onChange={(e) =>
            updateParam("status", e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

          <option value="DRAFT">
            Draft
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="PUBLISHED">
            Published
          </option>

          <option value="ARCHIVED">
            Archived
          </option>

          <option value="REJECTED">
            Rejected
          </option>

          <option value="SCHEDULED">
            Scheduled
          </option>
        </select>

        {/* Category */}

        <select
          className="rounded-xl border border-slate-300 px-3 py-2"
          defaultValue={
            searchParams.get("category") ?? ""
          }
          onChange={(e) =>
            updateParam("category", e.target.value)
          }
        >
          <option value="">
            All Categories
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

        {/* Reporter */}

        <select
          className="rounded-xl border border-slate-300 px-3 py-2"
          defaultValue={
            searchParams.get("reporter") ?? ""
          }
          onChange={(e) =>
            updateParam("reporter", e.target.value)
          }
        >
          <option value="">
            All Reporters
          </option>

          {reporters.map((reporter) => (
            <option
              key={reporter.id}
              value={reporter.id}
            >
              {reporter.firstName}{" "}
              {reporter.lastName}
            </option>
          ))}
        </select>

        {/* Reset */}

        <button
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100"
        >
          <RotateCcw size={18} />
          Reset
        </button>

      </div>

    </div>
  );
}