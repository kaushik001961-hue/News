"use client";

import Link from "next/link";

type Post = {
  id: string;
  title: string;
  image: string | null;
  status: string;
  featured: boolean;
  breaking: boolean;
  views: number;
  createdAt: Date;
  author: {
    name: string;
  };
  category: {
    name: string;
  } | null;
};

interface Props {
  posts: Post[];
  search?: string;
  status?: string;
  category?: string;
  featured?: string;
  breaking?: string;
}

export default function PostsTable({
  posts,
  search = "",
  status = "",
  category = "",
  featured = "",
  breaking = "",
}: Props) {


const filteredPosts = posts.filter((post) => {
  const matchesSearch = post.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    !status || post.status === status;

  const matchesCategory =
    !category ||
    post.category?.name
      ?.toLowerCase()
      .includes(category.toLowerCase());

  const matchesFeatured =
    !featured ||
    (featured === "YES" && post.featured) ||
    (featured === "NO" && !post.featured);

  const matchesBreaking =
    !breaking ||
    (breaking === "YES" && post.breaking) ||
    (breaking === "NO" && !post.breaking);

  return (
    matchesSearch &&
    matchesStatus &&
    matchesCategory &&
    matchesFeatured &&
    matchesBreaking
  );
});

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Breaking</th>
              <th className="p-4">Views</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="py-10 text-center text-gray-500"
                >
                  No articles found.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Image */}
                  <td className="p-4">
                    <img
                      src={post.image || "/news-placeholder.jpg"}
                      alt={post.title}
                      className="h-16 w-24 rounded-lg object-cover"
                    />
                  </td>

                  {/* Title */}
                  <td className="p-4">
                    <div className="font-semibold">
                      {post.title}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {post.category?.name || "Uncategorized"}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="p-4">
                    {post.author?.name || "-"}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        post.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : post.status === "DRAFT"
                          ? "bg-yellow-100 text-yellow-700"
                          : post.status === "PENDING"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>

                  {/* Featured */}
                  <td className="p-4 text-center">
                    {post.featured ? "⭐" : "-"}
                  </td>

                  {/* Breaking */}
                  <td className="p-4 text-center">
                    {post.breaking ? "🔥" : "-"}
                  </td>

                  {/* Views */}
                  <td className="p-4">
                    {post.views.toLocaleString()}
                  </td>

                  {/* Date */}
                  <td className="p-4">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this article?"
                            )
                          ) {
                            // Delete action will be added later
                          }
                        }}
                        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                      >
                        Delete
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