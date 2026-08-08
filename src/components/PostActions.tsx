"use client";

import { useRouter } from "next/navigation";

export default function PostActions({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;

    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Post deleted");
      router.refresh();
    } else {
      alert("Delete failed");
    }
  }

  return (
    <div className="flex gap-3">
      <a
        href={`/dashboard/posts/${id}/edit`}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        Edit
      </a>

      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 font-medium"
      >
        Delete
      </button>
    </div>
  );
}