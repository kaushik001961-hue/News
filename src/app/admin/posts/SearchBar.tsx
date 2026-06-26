"use client";

import { useState } from "react";

interface Props {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  function handleChange(value: string) {
    setSearch(value);
    onSearch(value);
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Search by title..."
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select className="rounded-lg border border-gray-300 px-3 py-3">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Pending</option>
          </select>

          <select className="rounded-lg border border-gray-300 px-3 py-3">
            <option>All Categories</option>
          </select>

          <select className="rounded-lg border border-gray-300 px-3 py-3">
            <option>All Authors</option>
          </select>

          <button
            type="button"
            className="rounded-lg bg-gray-200 px-4 py-3 hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}