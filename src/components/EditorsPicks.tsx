"use client";

import Image from "next/image";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  image?: string | null;
  excerpt?: string | null;
  category?: {
    name: string;
  } | null;
}

export default function EditorsPicks({
  posts,
}: {
  posts: Post[];
}) {
  if (!posts?.length) return null;

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
        {posts.slice(0, 2).map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
          >
            <div className="relative h-72">
              <Image
                src={post.image || "/placeholder.jpg"}
                alt={post.title}
                fill
                sizes="50vw"
                className="object-cover group-hover:scale-105 transition duration-700"
              />
            </div>

            <div className="p-6">
              <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                {post.category?.name || "News"}
              </span>

              <h3 className="mt-4 text-2xl font-bold line-clamp-2">
                {post.title}
              </h3>

              <p className="mt-3 text-gray-600 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}