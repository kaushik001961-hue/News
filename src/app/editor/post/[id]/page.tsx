"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditorPostPage() {
  const params = useParams();

  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!params?.id) return;

    fetch(`/api/posts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [params]);

  if (!post) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="mb-4">
        Status: {post.status}
      </p>

      <div className="border p-4 rounded mb-6">
        {post.content}
      </div>

      <button
        onClick={async () => {
          await fetch(`/api/posts/${post.id}/submit`, {
            method: "PATCH",
          });

          alert("Sent for approval");

          window.location.reload();
        }}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Send For Approval
      </button>
    </div>
  );
}