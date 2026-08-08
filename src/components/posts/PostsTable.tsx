"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface Props {
  posts: any[];
}

export default function PostsTable({
  posts,
}: Props) {

  const [selectedPosts, setSelectedPosts] =
    useState<string[]>([]);

  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {

    return posts.filter((post) =>

      post.title
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [posts, search]);

  const toggleAll = () => {

    if (
      selectedPosts.length ===
      filteredPosts.length
    ) {

      setSelectedPosts([]);

      return;

    }

    setSelectedPosts(
      filteredPosts.map((p) => p.id)
    );

  };

  const toggleOne = (id: string) => {

    if (
      selectedPosts.includes(id)
    ) {

      setSelectedPosts(

        selectedPosts.filter(
          (item) => item !== id
        )

      );

      return;

    }

    setSelectedPosts([
      ...selectedPosts,
      id,
    ]);

  };

  return (

    <div className="space-y-4">

      {/* Top Bar */}

      <div className="flex items-center justify-between">

        <input
          placeholder="Search news..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-80 rounded-lg border p-3"
        />

        <div className="text-sm text-gray-500">

          {filteredPosts.length} Posts

        </div>

      </div>

      {/* Bulk */}

      <div className="flex items-center gap-4 rounded-lg border bg-gray-50 p-3">

        <select className="rounded border p-2">

          <option>
            Bulk Actions
          </option>

          <option>
            Publish
          </option>

          <option>
            Draft
          </option>

          <option>
            Delete
          </option>

          <option>
            Feature
          </option>

          <option>
            Breaking
          </option>

        </select>

        <button className="rounded bg-blue-600 px-4 py-2 text-white">

          Apply

        </button>

        <span className="text-sm text-gray-500">

          {selectedPosts.length}
          {" "}selected

        </span>

      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-xl border">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4">

                <input
                  type="checkbox"
                  checked={
                    filteredPosts.length > 0 &&
                    selectedPosts.length ===
                      filteredPosts.length
                  }
                  onChange={toggleAll}
                />

              </th>

              <th className="p-4 text-left">

                Image

              </th>

              <th className="p-4 text-left">

                Title

              </th>

              <th className="p-4 text-left">

                Category

              </th>

              <th className="p-4 text-left">

                Geography

              </th>

              <th className="p-4 text-left">

                Author

              </th>

              <th className="p-4 text-left">

                Status

              </th>

              <th className="p-4 text-left">

                Views

              </th>

              <th className="p-4 text-left">

                Date

              </th>

              <th className="p-4 text-center">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPosts.map((post) => (

              <tr
                key={post.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">

                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() =>
                      toggleOne(post.id)
                    }
                  />

                </td>

                <td className="p-4">

                  {post.image ? (

                    <img
                      src={post.image}
                      className="h-14 w-20 rounded object-cover"
                      alt={post.title}
                    />

                  ) : (

                    <div className="h-14 w-20 rounded bg-gray-200" />

                  )}

                </td>

                <td className="p-4">

                  <div className="font-semibold">

                    {post.title}

                  </div>

                  <div className="text-xs text-gray-500">

                    /{post.slug}

                  </div>

                </td>

                <td className="p-4">

                  {post.category?.name}

                </td>

                <td className="p-4">

                  <div>

                    {post.state?.name}

                  </div>

                  <div className="text-xs text-gray-500">

                    {post.district?.name}

                  </div>

                </td>

                <td className="p-4">

                  {post.author?.name}

                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs

                    ${
                      post.status === "PUBLISHED"

                        ? "bg-green-100 text-green-700"

                        : "bg-yellow-100 text-yellow-700"

                    }

                    `}
                  >

                    {post.status}

                  </span>

                </td>

                <td className="p-4">

                  {post.views ?? 0}

                </td>

                <td className="p-4">

                  {new Date(
                    post.createdAt
                  ).toLocaleDateString()}

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className="rounded bg-blue-600 px-3 py-1 text-xs text-white"
                    >

                      Edit

                    </Link>

                    <Link
                      href={`/news/${post.slug}`}
                      target="_blank"
                      className="rounded bg-green-600 px-3 py-1 text-xs text-white"
                    >

                      View

                    </Link>

                    <button
                      className="rounded bg-red-600 px-3 py-1 text-xs text-white"
                    >

                      Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}