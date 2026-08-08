"use client";

import { useMemo, useState } from "react";

import RichTextEditor from "./RichTextEditor";
import PublishPanel from "./PublishPanel";
import FeaturedImage from "./FeaturedImage";
import GalleryUploader from "./GalleryUploader";
import VideoUploader from "./VideoUploader";
import SeoPanel from "./SeoPanel";
import CategorySelect from "./CategorySelect";
import ReporterSelect from "./ReporterSelect";
import TagSelector from "./TagSelector";

interface Category {
  id: string;
  name: string;
}

interface Reporter {
  id: string;
  reporterId: string;
  firstName: string;
  lastName: string;
  designation?: string | null;
}

interface GalleryImage {
  id: string;
  url: string;
}

export interface NewsEditorValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;

  categoryId: string;
  reporterId: string;

  featuredImage?: string;

  gallery: GalleryImage[];

  videoUrl: string;

  tags: string[];

  seoTitle: string;
  seoDescription: string;
  keywords: string;
  canonicalUrl: string;

  featured: boolean;
  breaking: boolean;
  trending: boolean;

  status: string;
}

interface Props {
  categories: Category[];
  reporters: Reporter[];

  initialValues?: Partial<NewsEditorValues>;

  onSubmit: (values: NewsEditorValues) => Promise<void>;
}
export default function NewsEditor({
  categories,
  reporters,
  initialValues,
  onSubmit,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<NewsEditorValues>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",

    categoryId: "",
    reporterId: "",

    featuredImage: "",

    gallery: [],

    videoUrl: "",

    tags: [],

    seoTitle: "",
    seoDescription: "",
    keywords: "",
    canonicalUrl: "",

    featured: false,
    breaking: false,
    trending: false,

    status: "DRAFT",

    ...initialValues,
  });

  const generatedSlug = useMemo(() => {
  return form.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}, [form.title]);

const slug =
  form.slug.length > 0
    ? form.slug
    : generatedSlug;
    const update = <K extends keyof NewsEditorValues>(
  key: K,
  value: NewsEditorValues[K]
) => {
  setForm((prev) => ({
    ...prev,
    [key]: value,
  }));
};

const submit = async () => {
  setLoading(true);

  try {
    await onSubmit({
      ...form,
      slug,
    });
  } finally {
    setLoading(false);
  }
};
return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      submit();
    }}
    className="space-y-6"
  >
    {/* Header */}

    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h1 className="mb-6 text-3xl font-bold">
        News Editor
      </h1>

      {/* Headline */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold">
          News Headline
        </label>

        <input
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Enter news headline..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg focus:border-blue-600 focus:outline-none"
        />
      </div>

      {/* Slug */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold">
          Slug
        </label>

        <input
          type="text"
          value={slug}
          onChange={(e) => update("slug", e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      {/* Summary */}

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Short Description
        </label>

        <textarea
          rows={4}
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          placeholder="Short description..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

    </div>

    {/* Main Layout */}

    <div className="grid gap-6 xl:grid-cols-12">

      {/* Left */}

      <div className="space-y-6 xl:col-span-8">

        <RichTextEditor
          value={form.content}
          onChange={(html) => update("content", html)}
        />

      </div>

      {/* Right */}

      <div className="space-y-6 xl:col-span-4">
                <PublishPanel
          status={form.status}
          publishDate=""
          onStatusChange={(value) => update("status", value)}
          onSaveDraft={submit}
          onPublish={submit}
          onPreview={() => window.open("/preview", "_blank")}
        />

        <CategorySelect
          value={form.categoryId}
          categories={categories}
          onChange={(value) => update("categoryId", value)}
        />

        <ReporterSelect
          value={form.reporterId}
          reporters={reporters}
          onChange={(value) => update("reporterId", value)}
        />

        <FeaturedImage
          image={form.featuredImage}
          onChange={(file) => {
            if (!file) return;

            update(
              "featuredImage",
              URL.createObjectURL(file)
            );
          }}
          onRemove={() => update("featuredImage", "")}
        />

        <GalleryUploader
          images={form.gallery}
          onAdd={(files) => {
            const gallery = files.map((file) => ({
              id: crypto.randomUUID(),
              url: URL.createObjectURL(file),
            }));

            update("gallery", [
              ...form.gallery,
              ...gallery,
            ]);
          }}
          onRemove={(id) =>
            update(
              "gallery",
              form.gallery.filter((g) => g.id !== id)
            )
          }
        />

        <VideoUploader
          value={form.videoUrl}
          onChange={(value) => update("videoUrl", value)}
        />

        <TagSelector
          tags={form.tags}
          onChange={(tags) => update("tags", tags)}
        />

        <SeoPanel
          seoTitle={form.seoTitle}
          seoDescription={form.seoDescription}
          keywords={form.keywords}
          canonicalUrl={form.canonicalUrl}
          onSeoTitleChange={(v) => update("seoTitle", v)}
          onSeoDescriptionChange={(v) =>
            update("seoDescription", v)
          }
          onKeywordsChange={(v) => update("keywords", v)}
          onCanonicalUrlChange={(v) =>
            update("canonicalUrl", v)
          }
        />
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="mb-5 text-lg font-bold">
            News Options
          </h2>

          <div className="space-y-4">

            <label className="flex items-center justify-between">

              <span>Featured News</span>

              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  update("featured", e.target.checked)
                }
              />

            </label>

            <label className="flex items-center justify-between">

              <span>Breaking News</span>

              <input
                type="checkbox"
                checked={form.breaking}
                onChange={(e) =>
                  update("breaking", e.target.checked)
                }
              />

            </label>

            <label className="flex items-center justify-between">

              <span>Trending News</span>

              <input
                type="checkbox"
                checked={form.trending}
                onChange={(e) =>
                  update("trending", e.target.checked)
                }
              />

            </label>

          </div>

        </div>
              </div>

    </div>

    <div className="flex justify-end">

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save News"}
      </button>

    </div>

  </form>
);
}