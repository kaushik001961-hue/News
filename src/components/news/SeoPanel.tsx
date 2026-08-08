"use client";

interface SeoPanelProps {
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  canonicalUrl: string;

  onSeoTitleChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
  onKeywordsChange: (value: string) => void;
  onCanonicalUrlChange: (value: string) => void;
}

export default function SeoPanel({
  seoTitle,
  seoDescription,
  keywords,
  canonicalUrl,
  onSeoTitleChange,
  onSeoDescriptionChange,
  onKeywordsChange,
  onCanonicalUrlChange,
}: SeoPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold">
          SEO Settings
        </h2>
      </div>

      <div className="space-y-5 p-5">

        <div>
          <label className="mb-2 block text-sm font-medium">
            SEO Title
          </label>

          <input
            type="text"
            value={seoTitle}
            onChange={(e) => onSeoTitleChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="SEO title"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Meta Description
          </label>

          <textarea
            rows={4}
            value={seoDescription}
            onChange={(e) => onSeoDescriptionChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Meta description"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Keywords
          </label>

          <input
            type="text"
            value={keywords}
            onChange={(e) => onKeywordsChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="news, politics, sports..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Canonical URL
          </label>

          <input
            type="url"
            value={canonicalUrl}
            onChange={(e) => onCanonicalUrlChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="https://example.com/news/slug"
          />
        </div>

      </div>
    </div>
  );
}