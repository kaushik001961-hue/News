"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({
  value,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/reporter/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      onChange(data.image.url);
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    uploadFile(file);
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    uploadFile(file);
  }

  return (
    <div className="space-y-4">

      {value ? (
        <div className="relative overflow-hidden rounded-xl border">

          <img
            src={value}
            alt="Preview"
            className="h-64 w-full object-cover"
          />

          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white"
          >
            <Trash2 size={18} />
          </button>

        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-500 hover:bg-blue-50"
        >

          {uploading ? (
            <>
              <Loader2
                size={40}
                className="animate-spin text-blue-600"
              />

              <p className="mt-4 text-sm text-slate-500">
                Uploading...
              </p>
            </>
          ) : (
            <>
              <ImagePlus
                size={48}
                className="text-slate-400"
              />

              <p className="mt-4 font-semibold">
                Click or Drag & Drop
              </p>

              <p className="text-sm text-slate-500">
                JPG, PNG, WEBP
              </p>
            </>
          )}

        </div>
      )}

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

    </div>
  );
}