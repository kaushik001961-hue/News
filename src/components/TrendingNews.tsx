
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
}

export default function TrendingNews({
  posts,
}: {
  posts: Post[];
}) {
  if (!posts || posts.length === 0) return null;

  return (
    <aside className="bg-white rounded-3xl shadow-xl p-6 sticky top-28">

      <div className="flex items-center gap-2 mb-6">

        <Flame className="text-red-600" size={26} />

        <h2 className="text-2xl font-bold">
          Trending Now
        </h2>

      </div>

      <div className="space-y-5">

        {posts.slice(0, 8).map((post, index) => (

          <motion.div
            key={post.id}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >

            <Link
              href={`/news/${post.slug}`}
              className="flex gap-4 group"
            >

              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">

                {index + 1}

              </div>

              <div>

                <h3 className="font-semibold leading-6 group-hover:text-red-600 transition">

                  {post.title}

                </h3>

              </div>

            </Link>

          </motion.div>

        ))}

      </div>

    </aside>
  );
}
