"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Post {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
}

interface LiveTVProps {
  latestPosts?: Post[];
}

export default function LiveTV({ latestPosts = [] }: LiveTVProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold">
          Editor's Picks
        </h2>

        <span className="text-red-600 font-semibold">
          Curated Stories
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {latestPosts && latestPosts.length > 0 ? (
          latestPosts.slice(0, 2).map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition block"
            >
              <div className="relative h-72 w-full">
                <Image
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="mt-3 text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No editor's picks available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}