"use client";

import { useState } from "react";
import { toast } from "sonner";

interface Props {
  post?: any;
}



export default function PostForm({
  post,
}: Props) {

  const [title, setTitle] = useState(
    post?.title || ""
  );

  const [content, setContent] = useState(
    post?.content || ""
  );

  const [status, setStatus] = useState(
    post?.status || "DRAFT"
  );

  const [isBreaking, setIsBreaking] =
    useState(post?.isBreaking || false);

  /* ========================================
     SUBMIT FORM
  ======================================== */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {

      const response = await fetch(
        `/api/posts/${post.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            content,
            status,
          }),
        }
      );

      if (response.ok) {
       toast.success(
  "Post updated successfully"
);

window.location.href =
  "/dashboard/posts";
      } else {
        toast.error(
  "Failed to update post"
);
      }

    } catch (error) {

      console.error(error);

      toast.error(
  "Something went wrong"
);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl"
    >

      {/* TITLE */}
      <div>
        <label className="block mb-2 font-medium">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* CONTENT */}
      <div>
        <label className="block mb-2 font-medium">
          Content
        </label>

        <textarea
          rows={10}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* STATUS */}
      <div>
        <label className="block mb-2 font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="DRAFT">
            Draft
          </option>

          <option value="PUBLISHED">
            Published
          </option>

          <option value="PENDING">
            Pending
          </option>
        </select>
      </div>

      {/* BREAKING */}
      <div className="flex items-center gap-2">

        <input
          type="checkbox"
          checked={isBreaking}
          onChange={(e) =>
            setIsBreaking(
              e.target.checked
            )
          }
        />

        <label>
          Breaking News
        </label>

      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-lg"
      >
        Save Changes
      </button>

    </form>
  );
}