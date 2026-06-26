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

return ( <section>

  <div className="flex items-center justify-between mb-8">

    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
      Latest News
    </h2>

    <Link
      href="/latest"
      className="text-red-600 font-semibold hover:underline"
    >
      View All →
    </Link>

  </div>

  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

    {posts.map((post, index) => (

      <motion.article
        key={post.id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.03 }}
        className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
      >

        <Link href={`/news/${post.slug}`}>

          <div className="relative h-56 overflow-hidden">

            <Image
              src={post.image || "/placeholder.jpg"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute top-4 left-4">

              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">

                {post.category?.name || "News"}

              </span>

            </div>

          </div>

          <div className="p-5">

            <div className="flex items-center gap-2 text-gray-500 text-sm">

              <Clock3 size={14} />

              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString()
                : "Today"}

            </div>

            <h3 className="mt-3 text-xl font-bold line-clamp-2 text-slate-900 group-hover:text-red-600 transition">

              {post.title}

            </h3>

            <p className="mt-3 text-gray-600 line-clamp-3">

              {post.excerpt ||
                "Stay updated with the latest breaking news and analysis from AGS News."}

            </p>

            <div className="mt-5 text-red-600 font-semibold">

              Read More →

            </div>

          </div>

        </Link>

      </motion.article>

    ))}

  </div>

</section>

);
}
