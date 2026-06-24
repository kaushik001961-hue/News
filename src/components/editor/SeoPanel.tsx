
"use client";

interface Props {
  seoTitle: string;
  seoDescription: string;
  setSeoTitle: (value: string) => void;
  setSeoDescription: (value: string) => void;
}

export default function SeoPanel({
  seoTitle,
  seoDescription,
  setSeoTitle,
  setSeoDescription,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-5">

      <h2 className="text-xl font-semibold">
        🔍 SEO Metadata
      </h2>

      <div>

        <label className="mb-2 block font-medium">
          SEO Title
        </label>

        <input
          type="text"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          placeholder="Enter SEO title..."
          className="w-full rounded-lg border p-3"
        />

        <p className="mt-1 text-xs text-gray-500">
          {seoTitle.length}/60 characters
        </p>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          SEO Description
        </label>

        <textarea
          rows={4}
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
          placeholder="Enter SEO description..."
          className="w-full rounded-lg border p-3"
        />

        <p className="mt-1 text-xs text-gray-500">
          {seoDescription.length}/160 characters
        </p>

      </div>

    </div>
  );
}
