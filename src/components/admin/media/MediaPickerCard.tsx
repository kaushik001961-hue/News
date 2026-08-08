"use client";

import Image from "next/image";

import {
  CheckCircle2,
  Image as ImageIcon,
  Video,
  FileText,
} from "lucide-react";

interface Media {
  id: string;
  name: string;
  url: string;
  mimeType: string;
}

interface MediaPickerCardProps {
  media: Media;
  onSelect: () => void;
}

export default function MediaPickerCard({
  media,
  onSelect,
}: MediaPickerCardProps) {
  const isImage = media.mimeType.startsWith("image/");
  const isVideo = media.mimeType.startsWith("video/");

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">

      {/* Preview */}

      <div className="relative aspect-square bg-slate-100">

        {isImage ? (
          <Image
            src={media.url}
            alt={media.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : isVideo ? (
          <div className="flex h-full items-center justify-center">
            <Video
              size={60}
              className="text-red-500"
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileText
              size={60}
              className="text-slate-400"
            />
          </div>
        )}

        {/* Type Badge */}

        <div className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white">

          {isImage ? (
            <ImageIcon size={16} />
          ) : isVideo ? (
            <Video size={16} />
          ) : (
            <FileText size={16} />
          )}

        </div>

      </div>

      {/* Footer */}

      <div className="space-y-4 p-4">

        <div>

          <h3 className="truncate font-semibold text-slate-900">
            {media.name}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {media.mimeType}
          </p>

        </div>

        <button
          onClick={onSelect}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          <CheckCircle2 size={18} />

          Select Image
        </button>

      </div>

    </div>
  );
}