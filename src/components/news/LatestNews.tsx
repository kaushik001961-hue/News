"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  image?: string | null;
  category?: {
    name: string;
  } | null;
  createdAt?: string | Date;
}

interface Props {
  posts: NewsPost[];
}

export default function LatestNews({
  posts,
}: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-10">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-3xl font-bold">
          Latest News
        </h2>

        <Link
          href="/news"
          className="text-red-600 font-semibold hover:underline"
        >
          View All →
        </Link>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {posts.map((post) => (

          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="group rounded-3xl bg-white overflow-hidden shadow-md hover:shadow-2xl transition duration-500"
          >

            <div className="overflow-hidden">

              <Image
                src={post.image || "/placeholder.jpg"}
                alt={post.title}
                width={500}
                height={300}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-700"
              />

            </div>

            <div className="p-6">

              <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">

                {post.category?.name || "News"}

              </span>

              <h3 className="font-bold text-xl mt-4 group-hover:text-red-600 transition line-clamp-2">

                {post.title}

              </h3>

              <p className="text-gray-600 mt-3 line-clamp-3">

                {post.excerpt ||
                  "Read the full article for complete details."}

              </p>

              <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">

                <Clock size={14} />

                Latest Update

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}
