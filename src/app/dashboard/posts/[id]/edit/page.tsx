"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";



export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  // Extract user role safely from the active session
  const userRole = session?.user?.role; 

  const id = params.id as string;

const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [status, setStatus] = useState("");

const [loading, setLoading] = useState(false);
const [breaking, setBreaking] = useState(false);
const [featured, setFeatured] = useState(false);
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        
setTitle(data.title || "");
setContent(data.content || "");
setStatus(data.status || "");
setImage(data.image || "");
setVideo(data.video || "");
setBreaking(data.breaking || false);
setFeatured(data.featured || false);
      } catch (error) {
        console.error("Error loading post data:", error);
      }
    }
    if (id) fetchPost();
  }, [id]);

  // Handle standard saving/updating
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
  title,
  content,
  breaking,
  featured,
}),
      });
      if (!res.ok) throw new Error("Failed to update");
      alert("Post saved successfully");
      router.push("/dashboard/posts");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Editor Action: Submit to Admin
  async function handleSendForApproval() {
    try {
      const res = await fetch(`/api/posts/${id}/submit`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to submit");
      alert("Sent to admin for approval");
      router.push("/dashboard/posts");
    } catch (error) {
      console.error(error);
    }
  }

  // Admin Action: Publish Live
  async function handlePublish() {
    try {
      const res = await fetch(`/api/posts/${id}/publish`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to publish");
      alert("Post has been published live!");
      router.push("/dashboard/posts");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Content</label>
          <textarea
            className="w-full border rounded-lg p-3 min-h-[300px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-4">

  {image&& (
    <>
      <p className="font-semibold">Current Image</p>

      <img
        src={image}
        alt={title}
        className="w-64 rounded border"
      />
    </>
  )}

  <div>
    <label className="block mb-2 font-semibold">
      Replace Image
    </label>

    <input
      type="file"
      name="image"
      accept="image/*"
    />
  </div>

  {video && (
    <>
      <p className="font-semibold mt-4">
        Current Video
      </p>

      <video
        src={encodeURI(video)}
        controls
        className="w-80 rounded border"
      />
    </>
  )}

  <div>
    <label className="block mb-2 font-semibold">
      Replace Video
    </label>

    <input
      type="file"
      name="video"
      accept="video/*"
    />
  </div>

</div>
{userRole === "ADMIN" && (
  <div className="border rounded-lg p-4 space-y-3">
    <h3 className="font-semibold">News Settings</h3>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={breaking}
        onChange={(e) => setBreaking(e.target.checked)}
      />
      Breaking News
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={featured}
        onChange={(e) => setFeatured(e.target.checked)}
      />
      Top Story
    </label>
  </div>
)}

        {/* --- ROLE BASED BUTTON TRAPPING --- */}
        <div className="flex gap-4 pt-4">
          
          {/* Everyone can save changes to their work */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Progress"}
          </button>

          {/* EDITOR ONLY BUTTON: Show if user is Editor AND post is a draft */}
          {userRole === "EDITOR" && status === "DRAFT" && (
            <button
              type="button"
              onClick={handleSendForApproval}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
            >
              Send For Approval
            </button>
          )}

          {/* ADMIN ONLY BUTTON: Fixed status match for PENDING flag */}
          {userRole === "ADMIN" && status === "PENDING" && (
            <button
              type="button"
              onClick={handlePublish}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Approve & Publish
            </button>
          )}
          
        </div>
      </form>
    </div>
  );
}