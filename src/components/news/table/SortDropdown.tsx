"use client";

import { ArrowUpDown } from "lucide-react";

export type SortOption =
  | "latest"
  | "oldest"
  | "views"
  | "title-asc"
  | "title-desc";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options = [
  {
    value: "latest",
    label: "Latest First",
  },
  {
    value: "oldest",
    label: "Oldest First",
  },
  {
    value: "views",
    label: "Most Viewed",
  },
  {
    value: "title-asc",
    label: "Title (A-Z)",
  },
  {
    value: "title-desc",
    label: "Title (Z-A)",
  },
] as const;

export default function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <div className="flex items-center gap-3">

      <ArrowUpDown
        size={18}
        className="text-slate-500"
      />

      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value as SortOption
          )
        }
        className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
}