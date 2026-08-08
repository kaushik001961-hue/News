"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadTags = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/tags");

      if (!res.ok) {
        throw new Error("Failed to load tags");
      }

      const data: Tag[] = await res.json();
      setTags(data);
    } catch (error) {
      console.error("Error loading tags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  const deleteTag = async (id: string) => {
    if (!confirm("Delete tag?")) return;

    try {
      await fetch(`/api/admin/tags/${id}`, {
        method: "DELETE",
      });

      await loadTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const filtered = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Tags</h1>
          <p className="mt-2 text-gray-500">
            Manage News Tags
          </p>
        </div>

        <Link
          href="/admin/tags/create"
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white"
        >
          <Plus size={18} />
          Add Tag
        </Link>
      </div>

      <div className="mb-8 rounded-2xl bg-white p-5 shadow">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            className="w-full rounded-xl border p-3 pl-10"
            placeholder="Search tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="text-left">Tag</th>
              <th className="text-left">Slug</th>
              <th className="pr-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-gray-500"
                >
                  No tags found
                </td>
              </tr>
            ) : (
              filtered.map((tag, index) => (
                <tr
                  key={tag.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="font-semibold">
                    {tag.name}
                  </td>

                  <td className="text-gray-500">
                    {tag.slug}
                  </td>

                  <td>
                    <div className="flex justify-end gap-4 pr-6">
                      <Link
                        href={`/admin/tags/edit/${tag.id}`}
                      >
                        <Pencil
                          size={18}
                          className="text-blue-600"
                        />
                      </Link>

                      <button
                        onClick={() => deleteTag(tag.id)}
                      >
                        <Trash2
                          size={18}
                          className="text-red-600"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}