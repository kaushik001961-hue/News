
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BreakingPost {
  id: string;
  title: string;
  slug: string;
}

export default function BreakingTicker({
  posts,
}: {
  posts: BreakingPost[];
}) {
  if (!posts || posts.length === 0) return null;

  const ticker = [...posts, ...posts];

  return (
    <section className="bg-red-600 text-white overflow-hidden rounded-2xl shadow-lg">

      <div className="flex items-center">

        <div className="bg-black px-5 py-4 font-bold whitespace-nowrap">
          🔥 BREAKING
        </div>

        <div className="overflow-hidden flex-1">

          <motion.div
            className="flex gap-10 whitespace-nowrap py-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {ticker.map((post, index) => (
              <Link
                key={`${post.id}-${index}`}
                href={`/news/${post.slug}`}
                className="hover:underline font-medium"
              >
                {post.title}
              </Link>
            ))}
          </motion.div>

        </div>

      </div>

    </section>
  );
}
