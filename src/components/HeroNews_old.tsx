
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface HeroPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  image?: string | null;
}

export default function HeroNews({
  posts,
}: {
  posts: HeroPost[];
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!posts || posts.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [posts]);

  if (!posts || posts.length === 0) return null;

  const post = posts[current];

  return (
    <section className="relative h-[72vh] lg:h-[85vh] overflow-hidden">

      {/* Background Image */}

      <AnimatePresence mode="wait">

        <motion.div
          key={post.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={post.image || "/placeholder.jpg"}
            alt={post.title}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

      </AnimatePresence>

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      {/* Content */}

      <div className="relative z-20 max-w-7xl mx-auto h-full flex items-center px-6">

        <div className="max-w-3xl">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <span className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-lg">

              🔴 BREAKING NEWS

            </span>

          </motion.div>

          <motion.h1
            key={post.title}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-7 text-white text-5xl lg:text-7xl font-bold leading-tight"
          >
            {post.title}
          </motion.h1>

          <motion.p
            key={post.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-7 text-gray-200 text-lg leading-8 max-w-2xl"
          >
            {post.excerpt ||
              "Stay updated with the latest national and international headlines from AGS News Network."}
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href={`/news/${post.slug}`}
              className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-full text-white font-semibold"
            >
              Read Full Story →
            </Link>

            <button className="border border-white/40 hover:bg-white hover:text-black transition px-8 py-4 rounded-full text-white">
              Latest Updates
            </button>

          </div>

        </div>

      </div>

      {/* Bottom Cards */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6">

        <div className="grid md:grid-cols-3 gap-5">

          {posts.slice(0, 3).map((item) => (

            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition"
            >

              <div className="text-red-400 text-xs font-bold uppercase tracking-widest">
                Top Story
              </div>

              <div className="mt-2 text-white font-semibold line-clamp-2">
                {item.title}
              </div>

            </Link>

          ))}

        </div>

      </div>

      {/* Slider Dots */}

      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex gap-3">

        {posts.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all rounded-full ${
              index === current
                ? "w-8 h-3 bg-white"
                : "w-3 h-3 bg-white/40"
            }`}
          />

        ))}

      </div>

    </section>
  );
}
