"use client";

import { useEffect, useState } from "react";

import {
  X,
  Search,
  Image as ImageIcon,
} from "lucide-react";

import MediaPickerGrid from "./MediaPickerGrid";

interface Media {
  id: string;
  name: string;
  url: string;
  mimeType: string;
}

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaPickerModal({
  open,
  onClose,
  onSelect,
}: MediaPickerModalProps) {
  const [media, setMedia] = useState<Media[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) return;

    fetch("/api/admin/media")
      .then((res) => res.json())
      .then(setMedia);
  }, [open]);

  if (!open) return null;

  const filtered = media.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">
              Media Library
            </h2>

            <p className="text-sm text-slate-500">
              Select an image
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="border-b p-5">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search media..."
              className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-3"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <ImageIcon
                size={70}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 text-lg font-semibold">
                No media found
              </p>
            </div>
          ) : (
            <MediaPickerGrid
              media={filtered}
              onSelect={(url) => {
                onSelect(url);
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}