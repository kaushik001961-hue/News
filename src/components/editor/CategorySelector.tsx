"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelector({
  value,
  onChange,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategories();
  }, []);

  return (
    <div>
      <label className="font-semibold">
        Category
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border p-3"
      >
        <option value="">
          Select Category
        </option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}