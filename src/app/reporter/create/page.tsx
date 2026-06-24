"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(status: "DRAFT" | "PENDING") {
    try {
      setLoading(true);

      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert(
        status === "DRAFT"
          ? "Draft saved successfully"
          : "Submitted for review"
      );

      router.push("/reporter/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">
        Create News Story
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Slug
          </label>

          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="news-title"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Content
          </label>

          <textarea
            className="w-full border rounded-lg p-3 min-h-[300px]"
            placeholder="Write your news content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleSubmit("DRAFT")}
            disabled={loading}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg"
          >
            Save Draft
          </button>

          <button
            onClick={() => handleSubmit("PENDING")}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Submit For Review
          </button>
        </div>
      </div>
    </div>
  );
}