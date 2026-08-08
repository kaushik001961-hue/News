"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Upload,
  Loader2,
  FileText,
  Trash2,
} from "lucide-react";

interface Props {
  label: string;
  value?: string;
  accept?: string;
  onChange: (path: string) => void;
}

export default function FileUploader({
  label,
  value,
  accept,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const [preview, setPreview] = useState(value || "");

  async function uploadFile(
    file: File
  ) {
    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await fetch(
        "/api/upload/reporter",
        {
          method: "POST",
          body: formData,
        }
      );

      const json = await res.json();

      if (json.success) {
        setPreview(json.path);

        onChange(json.path);
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error(err);

      alert("Upload failed.");
    }

    setUploading(false);
  }

  function handleSelect(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    uploadFile(file);
  }

  function removeFile() {
    setPreview("");

    onChange("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
    const isImage =
    preview &&
    (
      preview.endsWith(".jpg") ||
      preview.endsWith(".jpeg") ||
      preview.endsWith(".png") ||
      preview.endsWith(".webp")
    );

  return (
    <div className="space-y-3">

      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-500 hover:bg-blue-50"
      >

        {uploading ? (

          <div className="flex flex-col items-center justify-center">

            <Loader2
              className="h-10 w-10 animate-spin text-blue-600"
            />

            <p className="mt-4 text-sm text-slate-500">
              Uploading...
            </p>

          </div>

        ) : preview ? (

          <div className="flex flex-col items-center">

            {isImage ? (

              <Image
                src={preview}
                alt="Preview"
                width={220}
                height={220}
                className="rounded-xl border object-cover"
              />

            ) : (

              <div className="flex flex-col items-center">

                <FileText
                  className="h-16 w-16 text-blue-600"
                />

                <p className="mt-3 text-sm font-medium">
                  Document Uploaded
                </p>

              </div>

            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="mt-6 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              <Trash2 size={18} />

              Remove
            </button>

          </div>

        ) : (

          <div className="flex flex-col items-center">

            <Upload
              className="h-12 w-12 text-slate-400"
            />

            <h3 className="mt-4 text-lg font-semibold">
              Click to Upload
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              JPG, PNG, WEBP or PDF
            </p>

          </div>

        )}

      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        onChange={handleSelect}
      />
            <p className="text-xs text-slate-500">
        Maximum file size: <strong>5 MB</strong><br />
        Supported formats: JPG, JPEG, PNG, WEBP and PDF.
      </p>

    </div>
  );
}