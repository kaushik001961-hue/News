"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateNewsFormProps {
  redirectTo: string;
  apiEndpoint?: string;
  isAdmin?: boolean;
}

export default function CreateNewsForm({
  redirectTo,
  apiEndpoint = "/api/posts/create",
  isAdmin = false,
}: CreateNewsFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(status: "DRAFT" | "PENDING") {
    if (!title.trim()) {
      alert("Please enter a News title.");
      return;
    }

    if (!content.trim()) {
      alert("Please enter News content.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          content,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong.");
        return;
      }

      alert(
        status === "DRAFT"
          ? "News draft saved successfully."
          : "News submitted for review."
      );

      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      console.error("CREATE NEWS ERROR:", error);
      alert("Failed to create News.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Create News
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create and submit a new News story.
        </p>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}
      <div className="space-y-6">
        {/* TITLE */}
        <div>
          <label className="mb-2 block font-medium text-slate-800">
            News Title
          </label>

          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter News title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="mb-2 block font-medium text-slate-800">
            Slug
          </label>

          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="news-title"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="mb-2 block font-medium text-slate-800">
            News Content
          </label>

          <textarea
            className="min-h-[300px] w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Write your News content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => handleSubmit("DRAFT")}
            disabled={loading}
            className="rounded-lg bg-gray-800 px-6 py-3 font-medium text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("PENDING")}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit For Review"}
          </button>
        </div>
      </div>
    </div>
  );
}