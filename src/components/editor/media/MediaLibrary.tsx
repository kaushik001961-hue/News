"use client";

import { useEffect, useState } from "react";

import MediaUploader from "./MediaUploader";
import MediaGrid from "./MediaGrid";

interface Media {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

interface Props {
  onSelect?: (url: string) => void;
}

export default function MediaLibrary({
  onSelect,
}: Props) {
  const [media, setMedia] = useState<Media[]>([]);
  const [search, setSearch] = useState("");

  async function loadMedia() {
    const res = await fetch("/api/media");

    const data = await res.json();

    setMedia(data);
  }

  useEffect(() => {
    loadMedia();
  }, []);

  async function deleteMedia(id: string) {
    const ok = confirm("Delete this image?");

    if (!ok) return;

    await fetch(`/api/media/delete?id=${id}`, {
      method: "DELETE",
    });

    loadMedia();
  }

  const filtered = media.filter((item) =>
    item.originalName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <MediaUploader
        onUploadComplete={loadMedia}
      />

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search images..."
        className="w-full rounded-lg border p-3"
      />

      <MediaGrid
        media={filtered}
        onDelete={deleteMedia}
        onSelect={onSelect}
      />

    </div>
  );
}
