
"use client";

import { useState } from "react";

interface Media {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

interface Props {
  media: Media[];
  onDelete?: (id: string) => void;
  onSelect?: (url: string) => void;
}

export default function MediaGrid({
  media,
  onDelete,
  onSelect,
}: Props) {
  const [copied, setCopied] = useState("");

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);

    setCopied(url);

    setTimeout(() => {
      setCopied("");
    }, 1500);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5">

      {media.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
        >
          <img
            src={item.url}
            alt={item.originalName}
            className="h-44 w-full object-cover cursor-pointer"
            onClick={() => onSelect?.(item.url)}
          />

          <div className="p-3">

            <h3 className="truncate text-sm font-semibold">
              {item.originalName}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {(item.size / 1024).toFixed(1)} KB
            </p>

            <p className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-3 flex gap-2">

              <button
                onClick={() => copyUrl(item.url)}
                className="flex-1 rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
              >
                {copied === item.url ? "Copied!" : "Copy URL"}
              </button>

              <button
                onClick={() => onDelete?.(item.id)}
                className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}
