"use client";

import { KeyboardEvent, useState } from "react";
import { X, Tag } from "lucide-react";

interface TagSelectorProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagSelector({
  tags,
  onChange,
}: TagSelectorProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();

    if (!value) return;

    if (tags.includes(value)) {
      setInput("");
      return;
    }

    onChange([...tags, value]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Tag size={20} />
          Tags
        </h2>
      </div>

      {/* Body */}

      <div className="space-y-4 p-5">
        <input
          type="text"
          value={input}
          placeholder="Type a tag and press Enter"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {tag}

              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-full hover:bg-blue-200"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>

        <p className="text-xs text-slate-500">
          Press <strong>Enter</strong> to add a new tag.
        </p>
      </div>
    </div>
  );
}