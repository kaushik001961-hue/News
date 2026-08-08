"use client";

import Image from "next/image";
import { Eye, Trash2, FileText } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  title?: string;
  type?: string;
  size?: number;
  createdAt?: string | Date;
}

interface MediaCardProps {
  item: MediaItem;
  onPreview?: (item: MediaItem) => void;
  onDelete?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export default function MediaCard({
  item,
  onPreview,
  onDelete,
  isSelected,
  onSelect,
}: MediaCardProps) {
  // 🎯 Safely check if item exists before reading properties
  if (!item) return null;

  // 🎯 Safe check with optional chaining on item
  const isImage =
    item?.type?.startsWith("image/") ||
    (item?.url && typeof item.url === "string" && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(item.url));

  const displayUrl = item?.url || "/images/news-placeholder.jpg";
  const displayTitle = item?.title || item?.url?.split("/").pop() || "Untitled Media";

  return (
    <div
      className={`group relative rounded-xl border bg-white overflow-hidden transition shadow-sm hover:shadow-md ${
        isSelected ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-200"
      }`}
    >
      {/* Checkbox Overlay */}
      {onSelect && (
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={isSelected || false}
            onChange={() => onSelect(item.id)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>
      )}

      {/* Image / File Thumbnail */}
      <div className="relative aspect-square w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {isImage ? (
          <Image
            src={displayUrl}
            alt={displayTitle}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <FileText className="w-12 h-12 text-gray-400" />
        )}

        {/* Hover Action Buttons */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
          {onPreview && (
            <button
              type="button"
              onClick={() => onPreview(item)}
              className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-blue-600 hover:bg-white transition"
              title="Preview"
            >
              <Eye size={16} />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-red-600 hover:bg-white transition"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3">
        <p className="text-xs font-medium text-gray-800 truncate" title={displayTitle}>
          {displayTitle}
        </p>
      </div>
    </div>
  );
}