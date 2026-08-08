"use client";

import { useRef, DragEvent } from "react";
import Image from "next/image";
import { UploadCloud, Trash2, ImagePlus } from "lucide-react";

interface Props {
  image: string;
  setImage: (value: string) => void;
}

export default function ImageUploader({
  image,
  setImage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  //-----------------------------------
  // File Upload
  //-----------------------------------

  const uploadFile = (file: File) => {
    const url = URL.createObjectURL(file);

    // Temporary preview
    setImage(url);

    // Later upload to server
    // const formData = new FormData();
    // formData.append("file", file);
    // fetch("/api/upload", {
    //     method:"POST",
    //     body:formData
    // });
  };

  //-----------------------------------

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!e.dataTransfer.files.length) return;

    uploadFile(e.dataTransfer.files[0]);
  };

  //-----------------------------------

  return (
    <div className="space-y-3">

      <label className="font-semibold text-lg">
        Featured Image
      </label>

      {!image && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="
          cursor-pointer
          rounded-2xl
          border-2
          border-dashed
          border-gray-300
          p-12
          transition
          hover:border-red-500
          hover:bg-red-50
          text-center
        "
        >
          <UploadCloud
            className="mx-auto mb-4 text-gray-400"
            size={50}
          />

          <p className="font-semibold">
            Drag & Drop Image
          </p>

          <p className="text-gray-500 mt-2">
            or click to browse
          </p>

          <input
            ref={inputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files?.length) return;
              uploadFile(e.target.files[0]);
            }}
          />
        </div>
      )}

      {image && (
        <div className="space-y-4">

          <div className="overflow-hidden rounded-xl border">

            <Image
              src={image}
              alt="Preview"
              width={1200}
              height={700}
              className="h-auto w-full object-cover"
            />

          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="
                flex items-center gap-2
                rounded-lg
                bg-blue-600
                px-4
                py-2
                text-white
              "
            >
              <ImagePlus size={18} />

              Replace
            </button>

            <button
              type="button"
              onClick={() => setImage("")}
              className="
                flex items-center gap-2
                rounded-lg
                bg-red-600
                px-4
                py-2
                text-white
              "
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
              if (!e.target.files?.length) return;

              uploadFile(e.target.files[0]);
            }}
          />

        </div>
      )}

    </div>
  );
}