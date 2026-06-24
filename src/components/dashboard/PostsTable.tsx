"use client";

import Link from "next/link";

export default function PostsTable({
  posts,
}: {
  posts: any[];
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      {/* Filters */}

      <div className="flex gap-4 border-b p-5">

        <input
          placeholder="Search..."
          className="w-80 rounded-lg border p-2"
        />

        <select className="rounded-lg border p-2">
          <option>All Status</option>
        </select>

        <select className="rounded-lg border p-2">
          <option>All Categories</option>
        </select>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">Title</th>

            <th className="text-left">Author</th>

            <th className="text-left">Status</th>

            <th className="text-left">Category</th>

            <th className="text-left">Date</th>

            <th className="text-left">Actions</th>

          </tr>

        </thead>

        <tbody>

          {posts.map((post: any) => (
            <tr
              key={post.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4 font-medium">
                {post.title}
              </td>

              <td>
                {post.author?.name}
              </td>

              <td>

                {post.status === "PUBLISHED" && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    Published
                  </span>
                )}

                {post.status === "DRAFT" && (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
                    Draft
                  </span>
                )}

                {post.status === "PENDING" && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                    Pending
                  </span>
                )}

                {post.status === "REJECTED" && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
                    Rejected
                  </span>
                )}

              </td>

              <td>
                {post.category?.name || "-"}
              </td>

              <td>
                {new Date(post.createdAt).toLocaleDateString()}
              </td>

              <td className="py-4">

                <div className="flex gap-2">

                  <Link
                    href={`/editor/edit/${post.id}`}
                    className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  >
                    ✏ Edit
                  </Link>

                  <button
                    className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                  >
                    🗑 Delete
                  </button>

                </div>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}
