"use client";

import { useRef } from "react";
import Image from "next/image";
import { Images, Upload, Trash2 } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
}

interface GalleryUploaderProps {
  images: GalleryImage[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
}

export default function GalleryUploader({
  images,
  onAdd,
  onRemove,
}: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter((file) => {
      const validType = file.type.startsWith("image/");
      const validSize = file.size <= 5 * 1024 * 1024;

      return validType && validSize;
    });

    if (validFiles.length) {
      onAdd(validFiles);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Images size={20} />
          Gallery Images
        </h2>
      </div>

      <div className="space-y-5 p-5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-10 transition hover:border-blue-500 hover:bg-slate-50"
        >
          <Upload size={22} />
          Upload Gallery Images
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl border"
              >
                <Image
                  src={image.url}
                  alt=""
                  width={400}
                  height={300}
                  className="h-36 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => onRemove(image.id)}
                  className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-slate-500">
          Upload JPG, PNG or WEBP images (maximum 5 MB each).
        </p>
      </div>
    </div>
  );
}