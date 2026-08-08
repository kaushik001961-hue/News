"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ParentCategory {
  id: string;
  name: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;

  parentId: string;

  color: string;

  image: string;

  active: boolean;

  featured: boolean;

  seoTitle: string;

  seoDescription: string;

  seoKeywords: string;
}

interface CategoryFormProps {
  mode: "create" | "edit";

  initialData?: Partial<CategoryFormData>;

  parents: ParentCategory[];

  loading?: boolean;

  onSubmit: (
    data: CategoryFormData
  ) => Promise<void>;
}

export default function CategoryForm({
  mode,
  initialData,
  parents,
  loading = false,
  onSubmit,
}: CategoryFormProps) {
  const [form, setForm] =
    useState<CategoryFormData>({
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      description:
        initialData?.description ?? "",

      parentId:
        initialData?.parentId ?? "",

      color:
        initialData?.color ?? "#2563eb",

      image:
        initialData?.image ?? "",

      active:
        initialData?.active ?? true,

      featured:
        initialData?.featured ?? false,

      seoTitle:
        initialData?.seoTitle ?? "",

      seoDescription:
        initialData?.seoDescription ?? "",

      seoKeywords:
        initialData?.seoKeywords ?? "",
    });

  useEffect(() => {
    if (!form.slug) {
      setForm((prev) => ({
        ...prev,
        slug: prev.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      }));
    }
  }, [form.name]);

  function update(
    key: keyof CategoryFormData,
    value: any
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Basic Information */}

      <div className="rounded-3xl bg-white p-8 shadow-sm border">

        <h2 className="mb-6 text-2xl font-bold">
          Basic Information
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Category Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                update("name", e.target.value)
              }
              className="w-full rounded-xl border p-3"
              required
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Slug
            </label>

            <input
              value={form.slug}
              onChange={(e) =>
                update("slug", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div className="lg:col-span-2">

            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={5}
              value={form.description}
              onChange={(e) =>
                update(
                  "description",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

        </div>

      </div>

      {/* Settings */}

      <div className="rounded-3xl bg-white p-8 shadow-sm border">

        <h2 className="mb-6 text-2xl font-bold">
          Settings
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Parent Category
            </label>

            <select
              value={form.parentId}
              onChange={(e) =>
                update(
                  "parentId",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            >

              <option value="">
                None
              </option>

              {parents.map((parent) => (

                <option
                  key={parent.id}
                  value={parent.id}
                >
                  {parent.name}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Color
            </label>

            <input
              type="color"
              value={form.color}
              onChange={(e) =>
                update("color", e.target.value)
              }
              className="h-12 w-full rounded-xl border"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Image URL
            </label>

            <input
              value={form.image}
              onChange={(e) =>
                update("image", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div className="flex gap-8 pt-8">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  update(
                    "active",
                    e.target.checked
                  )
                }
              />

              Active

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  update(
                    "featured",
                    e.target.checked
                  )
                }
              />

              Featured

            </label>

          </div>

        </div>

      </div>

      {/* SEO */}

      <div className="rounded-3xl bg-white p-8 shadow-sm border">

        <h2 className="mb-6 text-2xl font-bold">
          SEO
        </h2>

        <div className="space-y-5">

          <input
            placeholder="SEO Title"
            value={form.seoTitle}
            onChange={(e) =>
              update(
                "seoTitle",
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          />

          <textarea
            rows={4}
            placeholder="SEO Description"
            value={form.seoDescription}
            onChange={(e) =>
              update(
                "seoDescription",
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="SEO Keywords"
            value={form.seoKeywords}
            onChange={(e) =>
              update(
                "seoKeywords",
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end gap-4">

        <Link
          href="/admin/categories"
          className="rounded-xl border px-6 py-3 font-semibold"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Create Category"
            : "Update Category"}
        </button>

      </div>

    </form>
  );
}