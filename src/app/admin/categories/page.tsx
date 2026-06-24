"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoriesPage() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadCategories() {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function deleteCategory(id: string) {

    if (!confirm("Delete Category?")) return;

    await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });

    loadCategories();
  }

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500 mt-2">
            Manage news categories
          </p>

        </div>

        <Link
          href="/admin/categories/create"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition text-white px-5 py-3 rounded-xl"
        >
          <Plus size={18} />
          Add Category
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            placeholder="Search Category..."
            className="border rounded-xl pl-10 p-3 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                #
              </th>

              <th className="text-left">
                Category
              </th>

              <th className="text-left">
                Slug
              </th>

              <th className="text-right pr-6">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading && (

              <tr>

                <td
                  colSpan={4}
                  className="text-center py-10"
                >
                  Loading...
                </td>

              </tr>

            )}

            {!loading &&
              filtered.map((cat, index) => (

                <tr
                  key={cat.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="font-semibold">
                    {cat.name}
                  </td>

                  <td className="text-gray-500">
                    {cat.slug}
                  </td>

                  <td>

                    <div className="flex justify-end gap-4 pr-6">

                      <Link
                        href={`/admin/categories/edit/${cat.id}`}
                      >
                        <Pencil
                          size={18}
                          className="text-blue-600"
                        />
                      </Link>

                      <button
                        onClick={() =>
                          deleteCategory(cat.id)
                        }
                      >
                        <Trash2
                          size={18}
                          className="text-red-600"
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            {!loading &&
              filtered.length === 0 && (

                <tr>

                  <td
                    colSpan={4}
                    className="text-center py-10 text-gray-500"
                  >
                    No Categories Found
                  </td>

                </tr>

              )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
