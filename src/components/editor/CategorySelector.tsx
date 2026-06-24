
"use client";

import { useEffect, useMemo, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface Props {
  value: string;
  onChange: (id: string) => void;
}

export default function CategorySelector({
  value,
  onChange,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, categories]);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">

      <label className="font-semibold">
        Category
      </label>

      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border p-3"
      >
        <option value="">
          Select Category
        </option>

        {filtered.map((cat) => (
          <option
            key={cat.id}
            value={cat.id}
          >
            {cat.name}
          </option>
        ))}

      </select>

    </div>
  );
}
