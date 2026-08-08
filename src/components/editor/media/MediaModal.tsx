
"use client";

import MediaLibrary from "./MediaLibrary";

interface Props {
  open: boolean;
  onClose: () => void;
  onInsert: (url: string) => void;
}

export default function MediaModal({
  open,
  onClose,
  onInsert,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

      <div className="bg-white w-[95%] max-w-7xl rounded-xl shadow-xl p-6 max-h-[90vh] overflow-auto">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">
            Media Library
          </h2>

          <button
            onClick={onClose}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Close
          </button>

        </div>

        <MediaLibrary
          onSelect={(url) => {
            onInsert(url);
            onClose();
          }}
        />

      </div>

    </div>
  );
}
