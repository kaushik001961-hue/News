"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import {
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

interface MediaUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function MediaUploader({
  value,
  onChange,
}: MediaUploaderProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function upload(
    file: File
  ) {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch(
        "/api/admin/media/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      onChange(data.url);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage() {
    onChange("");
  }

  return (
    <div className="space-y-4">

      {value ? (

        <div className="relative overflow-hidden rounded-2xl border">

          <Image
            src={value}
            alt="Preview"
            width={600}
            height={400}
            className="h-64 w-full object-cover"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white"
          >
            <X size={18} />
          </button>

        </div>

      ) : (

        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 transition hover:border-blue-600 hover:bg-blue-50"
        >

          {uploading ? (

            <>

              <Loader2
                size={50}
                className="animate-spin text-blue-600"
              />

              <p className="mt-4 font-semibold">
                Uploading...
              </p>

            </>

          ) : (

            <>

              <Upload
                size={52}
                className="text-blue-600"
              />

              <p className="mt-4 text-lg font-bold">
                Upload Image
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Click to browse or drag &
                drop
              </p>

            </>

          )}

        </button>

      )}

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          if (file) {
            upload(file);
          }
        }}
      />

      <div className="flex items-center gap-2 text-sm text-slate-500">

        <ImageIcon size={18} />

        JPG, PNG, WEBP (Max 10 MB)

      </div>

    </div>
  );
}