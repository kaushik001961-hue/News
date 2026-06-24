
"use client";

import { useEffect, useMemo, useState } from "react";

interface Tag {
  id: string;
  name: string;
}

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagsInput({
  value,
  onChange,
}: Props) {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/tags")
      .then((res) => res.json())
      .then(setAllTags)
      .catch(console.error);
  }, []);

  const suggestions = useMemo(() => {
    if (!search) return [];

    return allTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(search.toLowerCase()) &&
        !value.includes(tag.name)
    );
  }, [search, allTags, value]);

  function addTag(name: string) {
    const tag = name.trim();

    if (!tag) return;

    if (value.includes(tag)) return;

    onChange([...value, tag]);

    setSearch("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <label className="mb-3 block font-semibold">
        Tags
      </label>

      <div className="flex flex-wrap gap-2 mb-3">

        {value.map((tag) => (

          <div
            key={tag}
            className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
          >

            {tag}

            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="font-bold hover:text-red-900"
            >
              ×
            </button>

          </div>

        ))}

      </div>

      <input
        value={search}
        placeholder="Type tag and press Enter..."
        className="w-full rounded-lg border p-3"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(search);
          }
        }}
      />

      {suggestions.length > 0 && (

        <div className="mt-3 rounded-lg border bg-white shadow">

          {suggestions.map((tag) => (

            <button
              key={tag.id}
              type="button"
              onClick={() => addTag(tag.name)}
              className="block w-full border-b px-4 py-2 text-left hover:bg-gray-100"
            >
              {tag.name}
            </button>

          ))}

        </div>

      )}

    </div>
  );
}
