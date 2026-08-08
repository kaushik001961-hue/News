"use client";

import { useTransition } from "react";

import {
  AlertTriangle,
  Trash2,
  X,
  Image as ImageIcon,
} from "lucide-react";

import { deleteMedia } from "@/actions/media/delete-media";
import { MediaItem } from "./MediaGrid";

interface DeleteMediaDialogProps {
  open: boolean;
  media: MediaItem | null;
  onClose: () => void;
}

export default function DeleteMediaDialog({
  open,
  media,
  onClose,
}: DeleteMediaDialogProps) {
  const [isPending, startTransition] = useTransition();

  if (!open || !media) return null;

  function handleDelete() {
    if (!media) return;

    startTransition(async () => {
      try {
        await deleteMedia(media.id);
        onClose();
      } catch (error) {
        console.error(error);

        alert(
          error instanceof Error
            ? error.message
            : "Unable to delete media."
        );
      }
    });
  }

  // Safe accessors for media properties
  const mediaName =
    (media as any).name ||
    (media as any).filename ||
    (media as any).title ||
    "Media Item";

  const mediaSize = media.size ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-red-100 p-4 text-red-600">
              <AlertTriangle size={32} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Delete Media</h2>
              <p className="text-sm text-slate-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          <div className="flex items-center gap-4 rounded-2xl border bg-slate-50 p-4">
            <div className="rounded-xl bg-blue-100 p-3">
              <ImageIcon size={24} className="text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold">{mediaName}</h3>
              <p className="text-sm text-slate-500">
                {(mediaSize / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">
              The selected file will be removed from Cloudinary and your
              database permanently.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
          <button
            onClick={onClose}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-100"
          >
            <X size={18} />
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 size={18} />
            {isPending ? "Deleting..." : "Delete Media"}
          </button>
        </div>
      </div>
    </div>
  );
}