
"use client";

import { useState } from "react";

export default function CreatePostPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Create News Article
      </h1>

      <form className="space-y-8">

        {/* Title */}

        <div>
          <label className="block font-semibold mb-2">
            Title
          </label>

          <input
            className="w-full border rounded-xl p-4"
            placeholder="Enter news title"
          />
        </div>

        {/* Slug */}

        <div>
          <label className="block font-semibold mb-2">
            Slug
          </label>

          <input
            className="w-full border rounded-xl p-4"
            placeholder="auto-generated-slug"
          />
        </div>

        {/* Excerpt */}

        <div>
          <label className="block font-semibold mb-2">
            Short Description
          </label>

          <textarea
            rows={3}
            className="w-full border rounded-xl p-4"
          />
        </div>

        {/* Content */}

        <div>
          <label className="block font-semibold mb-2">
            Article Content
          </label>

          <textarea
            rows={14}
            className="w-full border rounded-xl p-4"
          />
        </div>

        {/* Image */}

        <div>
          <label className="block font-semibold mb-2">
            Featured Image
          </label>

          <input type="file" />
        </div>

        {/* Video */}

        <div>
          <label className="block font-semibold mb-2">
            Video URL
          </label>

          <input
            className="w-full border rounded-xl p-4"
            placeholder="https://youtube.com/..."
          />
        </div>

        {/* Category */}

        <div className="grid md:grid-cols-2 gap-6">

          <select className="border rounded-xl p-4">
            <option>Select Category</option>
          </select>

          <select className="border rounded-xl p-4">
            <option>Select State</option>
          </select>

          <select className="border rounded-xl p-4">
            <option>Select District</option>
          </select>

          <select className="border rounded-xl p-4">
            <option>Select Taluka</option>
          </select>

        </div>

        {/* Tags */}

        <div>
          <label className="block font-semibold mb-2">
            Tags
          </label>

          <input
            className="w-full border rounded-xl p-4"
            placeholder="politics,election,india"
          />
        </div>

        {/* SEO */}

        <div className="space-y-4">

          <input
            className="w-full border rounded-xl p-4"
            placeholder="SEO Title"
          />

          <textarea
            rows={3}
            className="w-full border rounded-xl p-4"
            placeholder="SEO Description"
          />

        </div>

        {/* Homepage Controls */}

        <div className="grid md:grid-cols-4 gap-4">

          <label>
            <input type="checkbox" /> Featured
          </label>

          <label>
            <input type="checkbox" /> Breaking
          </label>

          <label>
            <input type="checkbox" /> Hero
          </label>

          <label>
            <input type="checkbox" /> Editor's Pick
          </label>

        </div>

        {/* Buttons */}

        <div className="flex gap-4">

          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-gray-200"
          >
            Save Draft
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-red-600 text-white"
          >
            Submit for Approval
          </button>

        </div>

      </form>

    </div>
  );
}
