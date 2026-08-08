"use client";

import Image from "next/image";
import {
  X,
  Download,
  Copy,
  Calendar,
  HardDrive,
  Maximize2,
} from "lucide-react";

import { MediaItem } from "./MediaGrid";

interface MediaPreviewDialogProps {
  open: boolean;
  media?: MediaItem | null;
  item?: MediaItem | null;
  onClose: () => void;
}

export default function MediaPreviewDialog({
  open,
  media: mediaProp,
  item: itemProp,
  onClose,
}: MediaPreviewDialogProps) {
  // Support either `media` or `item` prop seamlessly
  const media = mediaProp || itemProp;

  if (!open || !media) return null;

  // Safe checks for mimeType & fallbacks
  const mime = media.mimeType || media.type || "";
  const isImage =
    mime.startsWith("image/") ||
    (!mime && Boolean(media.url?.match(/\.(jpeg|jpg|gif|png|webp)$/i)));
  const isVideo =
    mime.startsWith("video/") ||
    (!mime && Boolean(media.url?.match(/\.(mp4|webm|ogg)$/i)));

  // Safe accessor for media display name
  const mediaName =
    (media as any).name ||
    media.title ||
    media.fileName ||
    media.originalName ||
    "Untitled File";

  // Safe size and date calculations
  const mediaSizeKB = media.size ? (media.size / 1024).toFixed(1) : "0.0";
  const formattedDate = media.createdAt
    ? new Date(media.createdAt).toLocaleDateString()
    : "N/A";

  async function copyUrl() {
    if (!media?.url) return;
    await navigator.clipboard.writeText(media.url);
    alert("Media URL copied.");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
      <div className="flex h-[90vh] w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Preview */}
        <div className="relative flex flex-1 items-center justify-center bg-slate-100">
          {isImage ? (
            <Image
              src={media.url}
              alt={mediaName}
              fill
              className="object-contain"
            />
          ) : isVideo ? (
            <video controls className="h-full w-full object-contain">
              <source src={media.url} type={mime || undefined} />
            </video>
          ) : (
            <div className="text-center">
              <HardDrive
                size={80}
                className="mx-auto text-slate-400"
              />
              <p className="mt-4 text-xl font-bold">
                Preview not available
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-[360px] border-l bg-white">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-xl font-bold">File Details</h2>

            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-slate-100"
            >
              <X size={22} />
            </button>
          </div>

          <div className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-semibold truncate">{mediaName}</h3>
              <p className="mt-1 text-sm text-slate-500">{mime || "Unknown type"}</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <HardDrive size={18} className="text-blue-600" />
                {mediaSizeKB} KB
              </div>

              {media.width && media.height && (
                <div className="flex items-center gap-3">
                  <Maximize2 size={18} className="text-green-600" />
                  {media.width} × {media.height}
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-purple-600" />
                {formattedDate}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={copyUrl}
                className="w-full rounded-xl border border-slate-300 py-3 font-semibold hover:bg-slate-100"
              >
                <div className="flex items-center justify-center gap-2">
                  <Copy size={18} />
                  Copy URL
                </div>
              </button>

              <a
                href={media.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <Download size={18} />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}