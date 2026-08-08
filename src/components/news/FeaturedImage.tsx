"use client";

import Image from "next/image";
import { Upload, Trash2, ImageIcon } from "lucide-react";
import { ChangeEvent } from "react";

interface FeaturedImageProps {
  image?: string;
  onChange: (file: File | null) => void;
  onRemove: () => void;
}

export default function FeaturedImage({
  image,
  onChange,
  onRemove,
}: FeaturedImageProps) {
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-bold">
          Featured Image
        </h2>
      </div>

      {/* Content */}

      <div className="p-5">

        {image ? (
          <div className="space-y-4">

            <div className="overflow-hidden rounded-xl border">

              <Image
                src={image}
                alt="Featured"
                width={800}
                height={450}
                className="h-60 w-full object-cover"
              />

            </div>

            <div className="flex gap-3">

              <label className="flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-50">

                <Upload size={18} />

                Replace

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

              </label>

              <button
                onClick={onRemove}
                className="flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={18} />

                Remove
              </button>

            </div>

          </div>
        ) : (
          <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 transition hover:border-blue-500 hover:bg-slate-50">

            <ImageIcon
              size={50}
              className="text-slate-400"
            />

            <p className="mt-4 font-semibold">
              Upload Featured Image
            </p>

            <p className="mt-2 text-sm text-slate-500">
              JPG, PNG or WEBP
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

          </label>
        )}

      </div>
    </div>
  );
}