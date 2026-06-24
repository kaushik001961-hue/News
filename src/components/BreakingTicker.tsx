
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
    <section className="max-w-7xl mx-auto px-4 mt-8">

      <div className="rounded-2xl overflow-hidden bg-red-600 shadow-xl">

        <div className="flex items-center">

          <div className="bg-black text-white px-5 py-4 font-bold whitespace-nowrap">
            🔥 BREAKING
          </div>

          <div className="overflow-hidden flex-1">

            <motion.div
              className="flex gap-12 py-4 whitespace-nowrap"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 28,
                ease: "linear",
              }}
            >

              {ticker.map((item, index) => (

                <Link
                  key={`${item.id}-${index}`}
                  href={`/news/${item.slug}`}
                  className="text-white hover:underline font-medium"
                >
                  {item.title}
                </Link>

              ))}

            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}
