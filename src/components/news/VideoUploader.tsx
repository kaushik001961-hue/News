"use client";

import { Video, ExternalLink } from "lucide-react";

interface VideoUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function VideoUploader({
  value,
  onChange,
}: VideoUploaderProps) {
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    // YouTube
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    return "";
  };

  const embedUrl = getEmbedUrl(value);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Video size={20} />
          Video
        </h2>
      </div>

      <div className="space-y-5 p-5">

        <div>
          <label className="mb-2 block text-sm font-medium">
            YouTube Video URL
          </label>

          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {embedUrl && (
          <div className="overflow-hidden rounded-xl border">

            <iframe
              src={embedUrl}
              title="Video Preview"
              className="aspect-video w-full"
              allowFullScreen
            />

          </div>
        )}

        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <ExternalLink size={16} />
            Open Original Video
          </a>
        )}

      </div>

    </div>
  );
}