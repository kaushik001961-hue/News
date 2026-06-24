"use client";

import { useTransition, useState } from "react";
import { Save, Send, Loader2 } from "lucide-react";

interface PublishActionsProps {
  onSaveDraft: () => Promise<void>;
  onPublish: () => Promise<void>;
}

export default function PublishActions({
  onSaveDraft,
  onPublish,
}: PublishActionsProps) {
  const [isPending, startTransition] = useTransition();

  const [message, setMessage] = useState("");

  const handleDraft = () => {
    startTransition(async () => {
      try {
        await onSaveDraft();

        setMessage("✅ Draft saved successfully");

        setTimeout(() => {
          setMessage("");
        }, 3000);
      } catch (err) {
        setMessage("❌ Failed to save draft");
      }
    });
  };

  const handlePublish = () => {
    startTransition(async () => {
      try {
        await onPublish();

        setMessage("🎉 News published successfully");

        setTimeout(() => {
          setMessage("");
        }, 3000);
      } catch (err) {
        setMessage("❌ Failed to publish");
      }
    });
  };

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow">

      <div className="flex flex-wrap items-center gap-4">

        <button
          type="button"
          disabled={isPending}
          onClick={handleDraft}
          className="flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-3 font-semibold text-white transition hover:bg-black disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}

          Save Draft
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={handlePublish}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}

          Publish
        </button>

      </div>

      {message && (
        <div className="mt-5 rounded-lg border bg-green-50 px-4 py-3 text-green-700">
          {message}
        </div>
      )}

    </div>
  );
}
