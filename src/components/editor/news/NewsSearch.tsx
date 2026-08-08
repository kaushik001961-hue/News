"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface NewsSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function NewsSearch({
  value = "",
  onChange,
  placeholder = "Search news by title, reporter or category...",
}: NewsSearchProps) {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange?.(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, onChange]);

  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-11 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
      />

      {search && (
        <button
          type="button"
          onClick={() => {
            setSearch("");
            onChange?.("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}