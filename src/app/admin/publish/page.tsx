"use client";

import { useEffect, useState } from "react";

export default function AdminPublishPage() {
  const [posts, setPosts] = useState<any[]>([]);

  async function fetchPosts() {
    try {
      const res = await fetch(
        "/api/admin/approved-posts"
      );

      const data = await res.json();

      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function publishPost(id: string) {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "PUBLISHED",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      alert("Post published");

      fetchPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to publish");
    }
  }

  async function toggleBreaking(
    id: string,
    current: boolean
  ) {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          breaking: !current,
        }),
      });

      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleFeatured(
    id: string,
    current: boolean
  ) {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          featured: !current,
        }),
      });

      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">
        Admin Publish Queue
      </h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold">
              {post.title}
            </h2>

            <p className="mt-2 text-gray-500">
              Status: {post.status}
            </p>

            <div className="flex gap-3 mt-4 flex-wrap">
              <button
                onClick={() =>
                  publishPost(post.id)
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Publish
              </button>

              <button
                onClick={() =>
                  toggleBreaking(
                    post.id,
                    post.breaking
                  )
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                {post.breaking
                  ? "Remove Breaking"
                  : "Make Breaking"}
              </button>

              <button
                onClick={() =>
                  toggleFeatured(
                    post.id,
                    post.featured
                  )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {post.featured
                  ? "Remove Featured"
                  : "Make Featured"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}