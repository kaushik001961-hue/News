"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface BreakingPost {
  id: string;
  title: string;
  slug: string;
}

interface Props {
  posts: BreakingPost[];
}

export default function BreakingTicker({
  posts,
}: Props) {

  if (!posts || posts.length === 0) {
    return null;
  }

  // duplicate for infinite scrolling
  const ticker = [...posts, ...posts];

  return (
    <section className="bg-white py-4">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex overflow-hidden rounded-2xl shadow-lg border">

          {/* Left Label */}

          <div className="bg-red-600 text-white px-6 flex items-center gap-2 font-semibold whitespace-nowrap">

            <Flame size={18} />

            BREAKING

          </div>

          {/* Marquee */}

          <div className="flex-1 overflow-hidden bg-white">

            <motion.div
              className="flex gap-12 py-4 whitespace-nowrap"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
            >

              {ticker.map((item, index) => (

                <Link
                  key={`${item.id}-${index}`}
                  href={`/news/${item.slug}`}
                  className="font-medium hover:text-red-600 transition"
                >
                  🔴 {item.title}
                </Link>

              ))}

            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}