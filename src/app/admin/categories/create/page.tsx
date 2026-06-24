
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCategoryPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [loading, setLoading] = useState(false);

  function generateSlug(value: string) {

    const s = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    setSlug(s);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(
        "/api/admin/categories",
        {
          method: "POST",

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
          "Failed to create category"
        );

      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  }

  return (

    <div className="max-w-2xl mx-auto p-8">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">

          Create Category

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 font-semibold">

              Category Name

            </label>

            <input
              className="w-full border rounded-xl p-4"

              placeholder="Politics"

              value={name}

              onChange={(e) => {

                setName(
                  e.target.value
                );

                generateSlug(
                  e.target.value
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
              disabled={loading}

              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
            >

              {loading
                ? "Saving..."
                : "Save Category"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
