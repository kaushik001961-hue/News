"use client";

import { useEffect, useState } from "react";
import MediaPickerModal from "@/components/admin/media/MediaPickerModal";
import Link from "next/link";

import {
  Save,
  Eye,
  Newspaper,
  FileText,
} from "lucide-react";


export interface Category {
  id: string;
  name: string;
}

export interface Reporter {
  id: string;
  firstName: string;
  lastName: string;
}

export interface NewsFormData {
  title: string;
  slug: string;

  excerpt: string;

  content: string;

  featuredImage: string;

  videoUrl: string;

  categoryId: string;

  reporterId: string;

  tags: string[];

  featured: boolean;

  breaking: boolean;

  trending: boolean;

  status: string;

  seoTitle: string;

  seoDescription: string;

  seoKeywords: string;
}

interface NewsFormProps {
  mode: "create" | "edit";

  categories: Category[];

  reporters: Reporter[];

  initialData?: Partial<NewsFormData>;

  onSubmit: (
    data: NewsFormData
  ) => Promise<void>;
}

export default function NewsForm({
  mode,
  categories,
  reporters,
  initialData,
  onSubmit,
}: NewsFormProps) {

  const [loading, setLoading] =
    useState(false);

  const [openMedia, setOpenMedia] =
    useState(false);

  const [tagInput, setTagInput] =
    useState("");

  const [form, setForm] =
    useState<NewsFormData>({
      title: initialData?.title ?? "",

      slug: initialData?.slug ?? "",

      excerpt:
        initialData?.excerpt ?? "",

      content:
        initialData?.content ?? "",

      featuredImage:
        initialData?.featuredImage ?? "",

      videoUrl:
        initialData?.videoUrl ?? "",

      categoryId:
        initialData?.categoryId ?? "",

      reporterId:
        initialData?.reporterId ?? "",

      tags:
        initialData?.tags ?? [],

      featured:
        initialData?.featured ?? false,

      breaking:
        initialData?.breaking ?? false,

      trending:
        initialData?.trending ?? false,

      status:
        initialData?.status ??
        "DRAFT",

      seoTitle:
        initialData?.seoTitle ?? "",

      seoDescription:
        initialData?.seoDescription ?? "",

      seoKeywords:
        initialData?.seoKeywords ?? "",
    });

  function update(
    key: keyof NewsFormData,
    value: any
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  useEffect(() => {

    if (form.slug) return;

    update(
      "slug",

      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    );

  }, [form.title]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  }

  return (

<form
onSubmit={handleSubmit}
className="space-y-8"
>

{/* Header */}

<div className="flex items-center justify-between">

<div>

<h1 className="text-4xl font-black">

{mode === "create"
? "Create News"
: "Edit News"}

</h1>

<p className="mt-2 text-slate-500">

Publish articles to AGS NEWS

</p>

</div>

<div className="flex gap-3">

<Link
href="/admin/news"
className="rounded-xl border px-5 py-3"
>

Cancel

</Link>

<button
type="submit"
disabled={loading}
className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
>

<Save size={18} />

{loading
? "Saving..."
: mode === "create"
? "Create News"
: "Update News"}

</button>

</div>

</div>

{/* Basic Information */}

<div className="rounded-3xl border bg-white p-8 shadow-sm">

<div className="mb-8 flex items-center gap-3">

<Newspaper
size={28}
className="text-blue-600"
/>

<h2 className="text-2xl font-bold">

Basic Information

</h2>

</div>

<div className="grid gap-6">

<div>

<label className="mb-2 block font-semibold">

News Title

</label>

<input
value={form.title}
onChange={(e)=>
update(
"title",
e.target.value
)
}
className="w-full rounded-xl border p-3"
required
/>

</div>

<div>

<label className="mb-2 block font-semibold">

Slug

</label>

<input
value={form.slug}
onChange={(e)=>
update(
"slug",
e.target.value
)
}
className="w-full rounded-xl border p-3"
/>

</div>

<div>

<label className="mb-2 block font-semibold">

Excerpt

</label>

<textarea
rows={4}
value={form.excerpt}
onChange={(e)=>
update(
"excerpt",
e.target.value
)
}
className="w-full rounded-xl border p-3"
/>

</div>

</div>

</div>

      {/* Content */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-3">

          <FileText
            size={28}
            className="text-green-600"
          />

          <h2 className="text-2xl font-bold">
            Article Content
          </h2>

        </div>

        <label className="mb-2 block font-semibold">
          News Content
        </label>

        <textarea
          rows={18}
          value={form.content}
          onChange={(e) =>
            update("content", e.target.value)
          }
          className="w-full rounded-xl border p-4"
          placeholder="Write your news article here..."
        />

      </div>

      {/* Featured Image */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Featured Image
        </h2>

        {form.featuredImage ? (

          <div className="space-y-5">

            <img
              src={form.featuredImage}
              alt="Featured"
              className="h-72 w-full rounded-2xl border object-cover"
            />

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setOpenMedia(true)
                }
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Change Image
              </button>

              <button
                type="button"
                onClick={() =>
                  update(
                    "featuredImage",
                    ""
                  )
                }
                className="rounded-xl border px-5 py-3"
              >
                Remove Image
              </button>

            </div>

          </div>

        ) : (

          <div className="rounded-2xl border-2 border-dashed p-12 text-center">

            <p className="mb-6 text-lg text-slate-500">
              No featured image selected
            </p>

            <button
              type="button"
              onClick={() =>
                setOpenMedia(true)
              }
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Choose From Media Library
            </button>

          </div>

        )}

      </div>

      {/* Video */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Video
        </h2>

        <label className="mb-2 block font-semibold">
          YouTube / Vimeo URL
        </label>

        <input
          value={form.videoUrl}
          onChange={(e) =>
            update(
              "videoUrl",
              e.target.value
            )
          }
          placeholder="https://youtube.com/watch?v=..."
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Media Picker */}

      <MediaPickerModal
        open={openMedia}
        onClose={() =>
          setOpenMedia(false)
        }
        onSelect={(url) =>
          update(
            "featuredImage",
            url
          )
        }
      />

              {/* Category & Reporter */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold">
          Classification
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Category */}

          <div>

            <label className="mb-2 block font-semibold">
              Category
            </label>

            <select
              value={form.categoryId}
              onChange={(e) =>
                update(
                  "categoryId",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
              required
            >

              <option value="">
                Select Category
              </option>

              {categories.map((category) => (

                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>

              ))}

            </select>

          </div>

          {/* Reporter */}

          <div>

            <label className="mb-2 block font-semibold">
              Reporter
            </label>

            <select
              value={form.reporterId}
              onChange={(e) =>
                update(
                  "reporterId",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            >

              <option value="">
                Select Reporter
              </option>

              {reporters.map((reporter) => (

                <option
                  key={reporter.id}
                  value={reporter.id}
                >
                  {reporter.firstName}{" "}
                  {reporter.lastName}
                </option>

              ))}

            </select>

          </div>

        </div>

      </div>

      {/* Tags */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">
          Tags
        </h2>

        <div className="flex gap-3">

          <input
            value={tagInput}
            onChange={(e) =>
              setTagInput(e.target.value)
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                tagInput.trim()
              ) {

                e.preventDefault();

                if (
                  !form.tags.includes(
                    tagInput.trim()
                  )
                ) {

                  update("tags", [
                    ...form.tags,
                    tagInput.trim(),
                  ]);

                }

                setTagInput("");

              }

            }}
            placeholder="Press Enter to add tag"
            className="flex-1 rounded-xl border p-3"
          />

          <button
            type="button"
            onClick={() => {

              if (!tagInput.trim()) return;

              if (
                form.tags.includes(
                  tagInput.trim()
                )
              )
                return;

              update("tags", [
                ...form.tags,
                tagInput.trim(),
              ]);

              setTagInput("");

            }}
            className="rounded-xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700"
          >
            Add
          </button>

        </div>

        {form.tags.length > 0 && (

          <div className="mt-6 flex flex-wrap gap-3">

            {form.tags.map((tag) => (

              <div
                key={tag}
                className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700"
              >

                {tag}

                <button
                  type="button"
                  onClick={() =>
                    update(
                      "tags",
                      form.tags.filter(
                        (t) => t !== tag
                      )
                    )
                  }
                  className="font-bold"
                >
                  ×
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

            {/* Publishing */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold">
          Publishing
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Status */}

          <div>

            <label className="mb-2 block font-semibold">
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                update("status", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            >
              <option value="DRAFT">
                Draft
              </option>

              <option value="PENDING">
                Pending Review
              </option>

              <option value="PUBLISHED">
                Published
              </option>

              <option value="ARCHIVED">
                Archived
              </option>
            </select>

          </div>

        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          {/* Featured */}

          <label className="flex items-center justify-between rounded-2xl border p-5">

            <div>

              <h3 className="font-semibold">
                Featured News
              </h3>

              <p className="text-sm text-slate-500">
                Show on homepage.
              </p>

            </div>

            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                update(
                  "featured",
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />

          </label>

          {/* Breaking */}

          <label className="flex items-center justify-between rounded-2xl border p-5">

            <div>

              <h3 className="font-semibold">
                Breaking News
              </h3>

              <p className="text-sm text-slate-500">
                Display in breaking ticker.
              </p>

            </div>

            <input
              type="checkbox"
              checked={form.breaking}
              onChange={(e) =>
                update(
                  "breaking",
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />

          </label>

          {/* Trending */}

          <label className="flex items-center justify-between rounded-2xl border p-5">

            <div>

              <h3 className="font-semibold">
                Trending
              </h3>

              <p className="text-sm text-slate-500">
                Show in Trending section.
              </p>

            </div>

            <input
              type="checkbox"
              checked={form.trending}
              onChange={(e) =>
                update(
                  "trending",
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />

          </label>

        </div>

      </div>
            {/* SEO */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold">
          SEO Settings
        </h2>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-semibold">
              SEO Title
            </label>

            <input
              value={form.seoTitle}
              onChange={(e) =>
                update(
                  "seoTitle",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              SEO Description
            </label>

            <textarea
              rows={4}
              value={form.seoDescription}
              onChange={(e) =>
                update(
                  "seoDescription",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              SEO Keywords
            </label>

            <input
              value={form.seoKeywords}
              onChange={(e) =>
                update(
                  "seoKeywords",
                  e.target.value
                )
              }
              placeholder="news, politics, sports..."
              className="w-full rounded-xl border p-3"
            />

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="sticky bottom-0 z-20 rounded-3xl border bg-white p-6 shadow-xl">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="font-bold">
              Ready to Publish?
            </h3>

            <p className="text-sm text-slate-500">
              Review all information before saving.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/admin/news"
              className="rounded-xl border px-6 py-3 font-semibold hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50"
            >
              <Eye size={18} />
              Preview
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={18} />

              {loading
                ? "Saving..."
                : mode === "create"
                ? "Publish News"
                : "Update News"}
            </button>

          </div>

        </div>

      </div>

    </form>

  );
}
