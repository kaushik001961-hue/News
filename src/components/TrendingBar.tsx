"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
}

export default function TrendingBar({
  posts,
}: {
  posts: Post[];
}) {
  if (!posts?.length) return null;

  return (
    <section className="bg-white border-y border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

          <div className="flex items-center gap-2 min-w-fit">
            <TrendingUp className="h-5 w-5 text-red-600" />

            <span className="font-bold text-red-600 uppercase tracking-wide">
              Trending Now
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="group flex items-center gap-2 text-sm hover:text-red-600 transition"
              >
                <span className="font-bold text-red-600">
                  {index + 1}.
                </span>

                <span className="line-clamp-1">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}