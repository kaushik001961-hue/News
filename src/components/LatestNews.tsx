"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  image?: string | null;
  createdAt?: string;
  category?: {
    name: string;
  } | null;
}

export default function LatestNews({
  posts,
}: {
  posts: Post[];
}) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16">

      <div className="flex items-center justify-between mb-10">

        <h2 className="text-4xl font-bold text-slate-900">
          Latest News
        </h2>

        <Link
          href="/latest"
          className="text-red-600 font-semibold hover:underline"
        >
          View All →
        </Link>

      </div>

      <div className="columns-1 md:columns-2 xl:columns-3 gap-8">

        {posts.map((post, index) => (

          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05,
            }}
            className="mb-8 break-inside-avoid bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >

            <Link href={`/news/${post.slug}`}>

              <div
                className={`relative overflow-hidden ${
                  index % 3 === 0
                    ? "h-[420px]"
                    : index % 2 === 0
                    ? "h-[320px]"
                    : "h-[250px]"
                }`}
              >

                <Image
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  sizes="(max-width:768px)100vw,33vw"
                  className="object-cover hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <span className="absolute top-5 left-5 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold">

                  {post.category?.name || "News"}

                </span>

              </div>

              <div className="p-6">

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">

                  <Clock3 size={14} />

                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : "Today"}

                </div>

                <h3 className="text-2xl font-bold leading-tight hover:text-red-600 transition">

                  {post.title}

                </h3>

                <p className="mt-4 text-gray-600 line-clamp-3">

                  {post.excerpt ||
                    "Stay updated with the latest breaking news and exclusive coverage from AGS News."}

                </p>

                <div className="mt-6">

                  <span className="text-red-600 font-semibold">

                    Read More →

                  </span>

                </div>

              </div>

            </Link>

          </motion.article>

        ))}

      </div>

    </section>
  );
}
