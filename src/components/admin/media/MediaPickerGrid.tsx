"use client";

import MediaPickerCard from "./MediaPickerCard";

interface Media {
  id: string;
  name: string;
  url: string;
  mimeType: string;
}

interface MediaPickerGridProps {
  media: Media[];
  onSelect: (url: string) => void;
}

export default function MediaPickerGrid({
  media,
  onSelect,
}: MediaPickerGridProps) {
  if (media.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50">
        <div className="text-center">
          <p className="text-xl font-semibold text-slate-700">
            No Media Available
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Upload your first image to the Media Library.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {media.map((item) => (
        <MediaPickerCard
          key={item.id}
          media={item}
          onSelect={() => onSelect(item.url)}
        />
      ))}
    </div>
  );
}