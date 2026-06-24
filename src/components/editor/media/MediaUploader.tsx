
"use client";

import { useRef, useState } from "react";

interface Props {
  onUploadComplete?: () => void;
}

export default function MediaUploader({
  onUploadComplete,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const uploadFiles = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);

    if (onUploadComplete) {
      onUploadComplete();
    }
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 bg-white">

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => uploadFiles(e.target.files)}
      />

      <div className="flex flex-col items-center gap-4">

        <div className="text-5xl">
          📁
        </div>

        <h2 className="text-xl font-bold">
          Upload Images
        </h2>

        <p className="text-gray-500">
          Drag & Drop or Click below
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Choose Images
        </button>

        {uploading && (
          <div className="text-green-600 font-semibold">
            Uploading...
          </div>
        )}

      </div>

    </div>
  );
}