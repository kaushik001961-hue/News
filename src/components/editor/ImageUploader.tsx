"use client";

import { UploadCloud, Trash2, ImageIcon } from "lucide-react";
import { useRef } from "react";

interface Props {
  image: string;
  setImage: (value: string) => void;
}

export default function ImageUploader({
  image,
  setImage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    // Temporary local preview
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);

    // Later replace with:
    // const form = new FormData();
    // form.append("file", file);
    // const res = await fetch("/api/upload", {
    //   method: "POST",
    //   body: form,
    // });
    // const data = await res.json();
    // setImage(data.url);
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Featured Image
      </h2>

      {!image ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 transition hover:border-red-500 hover:bg-red-50"
        >
          <UploadCloud
            size={42}
            className="mb-3 text-gray-400"
          />

          <p className="font-medium">
            Click to upload image
          </p>

          <p className="text-sm text-gray-500">
            JPG, PNG or WebP
          </p>

          <input
            ref={inputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                handleFile(file);
              }
            }}
          />
        </div>
      ) : (
        <div>

          <img
            src={image}
            alt="Preview"
            className="mb-4 h-72 w-full rounded-xl object-cover"
          />

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              <ImageIcon size={18} />
              Change
            </button>

            <button
              type="button"
              onClick={() => setImage("")}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              <Trash2 size={18} />
              Remove
            </button>

          </div>

          <input
            ref={inputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                handleFile(file);
              }
            }}
          />

        </div>
      )}

    </div>
  );
}