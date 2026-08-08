"use client";

import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  status: string;
}

export default function EditorReviewQueue() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      console.log("Fetching queue posts...");
      const res = await fetch("/api/posts", { cache: "no-store" });
      const data = await res.json();
      console.log("Fetched posts from API:", data);
      if (Array.isArray(data)) {
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleApprove = async (postId: string) => {
    console.log("Approve clicked for post ID:", postId);
    setUpdatingId(postId);

    // 1. Optimistic Update: Immediately change button in UI
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, status: "PUBLISHED" } : p))
    );

    try {
      // 2. Call API
      const res = await fetch("/api/posts/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      const responseData = await res.json();
      console.log("Approve response:", responseData);

      if (!res.ok) {
        alert(`Failed to update: ${responseData.error || "Unknown error"}`);
        // Revert on error
        fetchPosts();
      }
    } catch (error) {
      console.error("Error sending approval request:", error);
      alert("Network error updating status.");
      fetchPosts();
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="p-6">Loading review queue...</div>;

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Editor Review Queue</h1>

      {posts.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border text-center text-gray-500">
          No posts available in the queue.
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const isPublished =
              post.status?.toUpperCase() === "PUBLISHED" ||
              post.status === "APPROVED";

            return (
              <div
                key={post.id}
                className="bg-white p-5 rounded-2xl border shadow-sm flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg text-blue-600">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        isPublished ? "text-green-600" : "text-amber-600"
                      }`}
                    >
                      {isPublished ? "Approved & Published" : post.status}
                    </span>
                  </p>
                </div>

                <div>
                  {!isPublished ? (
                    <button
                      type="button"
                      onClick={() => handleApprove(post.id)}
                      disabled={updatingId === post.id}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2 rounded-xl text-sm transition"
                    >
                      {updatingId === post.id ? "Updating..." : "Send For Approval"}
                    </button>
                  ) : (
                    <span className="inline-block bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-xl text-sm border border-green-200">
                      Approved & Published
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}