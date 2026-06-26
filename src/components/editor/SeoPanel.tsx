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
    <div className="rounded-xl border bg-white p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        SEO Settings
      </h2>

      <div>
        <label className="font-medium">SEO Title</label>

        <input
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          className="mt-2 w-full rounded-lg border p-3"
          placeholder="SEO title"
        />
      </div>

      <div>
        <label className="font-medium">
          SEO Description
        </label>

        <textarea
          rows={4}
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
          className="mt-2 w-full rounded-lg border p-3"
          placeholder="SEO description"
        />
      </div>
    </div>
  );
}