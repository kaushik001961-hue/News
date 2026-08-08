"use client";

import { useState } from "react";

import {
  Search,
  Upload,
  RefreshCw,
  Grid2X2,
  List,
  Filter,
} from "lucide-react";

interface MediaPickerToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  type: string;
  onTypeChange: (value: string) => void;

  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;

  onRefresh?: () => void;
  onUpload?: () => void;
}

export default function MediaPickerToolbar({
  search,
  onSearchChange,
  type,
  onTypeChange,
  view,
  onViewChange,
  onRefresh,
  onUpload,
}: MediaPickerToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-1 flex-wrap gap-3">

          <div className="relative min-w-[280px] flex-1">

            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search media..."
              className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-600"
            />

          </div>

          <div className="relative">

            <Filter
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />

            <select
              value={type}
              onChange={(e) =>
                onTypeChange(e.target.value)
              }
              className="rounded-xl border border-slate-300 py-2 pl-9 pr-4"
            >
              <option value="">
                All Files
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
            </select>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-2">

          <button
            onClick={onRefresh}
            className="rounded-xl border border-slate-300 p-2 hover:bg-slate-100"
          >
            <RefreshCw size={18} />
          </button>

          <button
            onClick={onUpload}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Upload size={18} />

            Upload
          </button>

          <div className="overflow-hidden rounded-xl border border-slate-300">

            <button
              onClick={() =>
                onViewChange("grid")
              }
              className={`p-2 ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              <Grid2X2 size={18} />
            </button>

            <button
              onClick={() =>
                onViewChange("list")
              }
              className={`p-2 ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >
              <List size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}