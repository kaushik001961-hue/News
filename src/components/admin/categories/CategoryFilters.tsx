"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  RotateCcw,
  Filter,
} from "lucide-react";

interface ParentCategory {
  id: string;
  name: string;
}

interface CategoryFiltersProps {
  parents: ParentCategory[];
}

export default function CategoryFilters({
  parents,
}: CategoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(
      `/admin/categories?${params.toString()}`
    );
  }

  function resetFilters() {
    router.push("/admin/categories");
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-2">

        <Filter
          className="text-blue-600"
          size={22}
        />

        <h2 className="text-lg font-bold">
          Filters
        </h2>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

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
            placeholder="Search category..."
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

          <option value="ACTIVE">
            Active
          </option>

          <option value="INACTIVE">
            Inactive
          </option>
        </select>

        {/* Parent Category */}

        <select
          className="rounded-xl border border-slate-300 px-3 py-2"
          defaultValue={
            searchParams.get("parent") ?? ""
          }
          onChange={(e) =>
            updateParam("parent", e.target.value)
          }
        >
          <option value="">
            All Parents
          </option>

          {parents.map((parent) => (
            <option
              key={parent.id}
              value={parent.id}
            >
              {parent.name}
            </option>
          ))}
        </select>

        {/* Reset */}

        <button
          onClick={resetFilters}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100"
        >
          <RotateCcw size={18} />
          Reset
        </button>

      </div>

    </div>
  );
}