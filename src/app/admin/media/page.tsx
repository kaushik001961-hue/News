"use client";

import { useEffect, useState } from "react";

interface Media {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export default function MediaPage() {

  const [media, setMedia] = useState<Media[]>([]);
  const [file, setFile] = useState<File | null>(null);

  async function loadMedia() {

    const res = await fetch("/api/admin/media");
    const data = await res.json();

    setMedia(data);

  }

  useEffect(() => {
    loadMedia();
  }, []);

  async function uploadFile() {

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/admin/media/upload", {
      method: "POST",
      body: formData,
    });

    setFile(null);
    loadMedia();

  }

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-6">
        Media Library
      </h1>

      {/* Upload */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={uploadFile}
          className="ml-4 bg-red-600 text-white px-5 py-2 rounded-xl"
        >
          Upload
        </button>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {media.map((m) => (

          <div key={m.id} className="bg-white rounded-xl shadow p-3">

            <img
              src={m.url}
              alt={m.originalName}
              className="w-full h-32 object-cover rounded-lg"
            />

            <p className="text-sm mt-2 truncate">
              {m.originalName}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}
