
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCategoryPage() {

  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  async function loadCategory() {

    try {

      const res = await fetch(
        `/api/admin/categories/${id}`
      );

      const data = await res.json();

      setName(data.name);
      setSlug(data.slug);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  }

  useEffect(() => {

    if (id) {
      loadCategory();
    }

  }, [id]);

  async function updateCategory(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setSaving(true);

    try {

      const res = await fetch(
        `/api/admin/categories/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            slug,
          }),
        }
      );

      if (res.ok) {

        router.push(
          "/admin/categories"
        );

        router.refresh();

      } else {

        alert(
          "Failed to update category."
        );

      }

    } catch (err) {

      console.log(err);

    }

    setSaving(false);

  }

  if (loading) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }

  return (

    <div className="max-w-2xl mx-auto p-8">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">

          Edit Category

        </h1>

        <form
          onSubmit={updateCategory}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 font-semibold">

              Category Name

            </label>

            <input
              className="w-full border rounded-xl p-4"

              value={name}

              onChange={(e) => {

                setName(
                  e.target.value
                );

                setSlug(
                  slugify(
                    e.target.value
                  )
                );

              }}
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">

              Slug

            </label>

            <input
              className="w-full border rounded-xl p-4"

              value={slug}

              onChange={(e) =>
                setSlug(
                  e.target.value
                )
              }
            />

          </div>

          <div className="flex gap-4 pt-4">

            <button
              type="button"

              onClick={() =>
                router.back()
              }

              className="px-6 py-3 rounded-xl bg-gray-200"
            >

              Cancel

            </button>

            <button
              disabled={saving}

              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
            >

              {saving
                ? "Updating..."
                : "Update Category"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
