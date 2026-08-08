"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  RotateCcw,
  Filter,
} from "lucide-react";

interface Folder {
  id: string;
  name: string;
}

interface MediaFiltersProps {
  folders?: Folder[];
}

export default function MediaFilters({
  folders = [],
}: MediaFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(
    key: string,
    value: string
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/admin/media?${params.toString()}`);
  }

  function resetFilters() {
    router.push("/admin/media");
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
            placeholder="Search media..."
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

        {/* Media Type */}

        <select
          className="rounded-xl border border-slate-300 px-3 py-2"
          defaultValue={
            searchParams.get("type") ?? ""
          }
          onChange={(e) =>
            updateParam("type", e.target.value)
          }
        >
          <option value="">
            All Types
          </option>

          <option value="image">
            Images
          </option>

          <option value="video">
            Videos
          </option>

          <option value="document">
            Documents
          </option>

          <option value="audio">
            Audio
          </option>
        </select>

        {/* Folder */}

        <select
          className="rounded-xl border border-slate-300 px-3 py-2"
          defaultValue={
            searchParams.get("folder") ?? ""
          }
          onChange={(e) =>
            updateParam("folder", e.target.value)
          }
        >
          <option value="">
            All Folders
          </option>

          {folders.map((folder) => (
            <option
              key={folder.id}
              value={folder.id}
            >
              {folder.name}
            </option>
          ))}
        </select>

        {/* Sort */}

        <select
          className="rounded-xl border border-slate-300 px-3 py-2"
          defaultValue={
            searchParams.get("sort") ?? "newest"
          }
          onChange={(e) =>
            updateParam("sort", e.target.value)
          }
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="name">
            File Name
          </option>

          <option value="size">
            File Size
          </option>
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