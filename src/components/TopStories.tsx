"use client";

import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  category?: {
    name: string;
  } | null;
}

export default function TopStories({
  posts,
}: {
  posts: Post[];
}) {
  if (!posts?.length) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">
          Top Stories
        </h2>

        <span className="text-red-600 font-semibold">
          Trending
        </span>
      </div>

      <div className="space-y-6">
        {posts.map((story, index) => (
          <Link
            key={story.id}
            href={`/news/${story.slug}`}
            className="flex gap-4 group"
          >
            <div className="text-4xl font-bold text-gray-200 min-w-[40px]">
              {index + 1}
            </div>

            <div>
              <h3 className="font-semibold text-lg leading-snug group-hover:text-red-600 transition">
                {story.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {story.category?.name || "News"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}