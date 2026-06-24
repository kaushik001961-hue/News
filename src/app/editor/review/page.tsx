"use client";

import { useEffect, useState } from "react";

export default function ReviewPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Editor Review
      </h1>

      {posts.length === 0 && (
        <p>No posts found</p>
      )}

      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-4 rounded mb-4"
        >
       <a
  href={`/editor/post/${post.id}`}
  className="text-blue-600 underline"
>
  {post.title}
</a>
          <p>Status: {post.status}</p>

          <button
            onClick={async () => {
              await fetch(
                `/api/posts/${post.id}/submit`,
                {
                  method: "PATCH",
                }
              );

              window.location.reload();
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
          >
            Send For Approval
          </button>
        </div>
      ))}
    </div>
  );
}