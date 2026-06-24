"use client";

import { useEffect, useState } from "react";

interface Props {
  title: string;
  value: string;
  onChange: (slug: string) => void;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export default function SlugInput({
  title,
  value,
  onChange,
}: Props) {
  const [manualEdit, setManualEdit] = useState(false);

  useEffect(() => {
    if (!manualEdit) {
      onChange(generateSlug(title));
    }
  }, [title, manualEdit, onChange]);

  return (
    <div className="space-y-2">

      <label className="block font-semibold">
        Permalink (Slug)
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => {
          setManualEdit(true);
          onChange(generateSlug(e.target.value));
        }}
        className="w-full rounded-xl border p-3"
        placeholder="news-slug"
      />

      <p className="text-sm text-gray-500">
        URL Preview:
      </p>

      <div className="rounded-lg bg-gray-100 p-3 text-sm text-blue-700 break-all">
        https://agsnews.in/news/{value || "your-news-slug"}
      </div>

      <button
        type="button"
        onClick={() => {
          setManualEdit(false);
          onChange(generateSlug(title));
        }}
        className="text-sm font-medium text-red-600 hover:underline"
      >
        Reset from Title
      </button>

    </div>
  );
}