"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface HeroPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  image?: string | null;
}

interface Props {
  posts: HeroPost[];
}

export default function HeroNews({
  posts,
}: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!posts?.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [posts]);

  if (!posts || posts.length === 0) {
    return (
      <section className="h-[90vh] flex items-center justify-center bg-slate-900 text-white">
        <h2 className="text-3xl font-bold">
          No Featured News Available
        </h2>
      </section>
    );
  }

  const post = posts[current];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? posts.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative h-[90vh] overflow-hidden">

      <AnimatePresence mode="wait">

        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={post.image || "/placeholder.jpg"}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>

      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      <div className="relative z-20 max-w-7xl mx-auto h-full flex items-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="inline-block bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
            BREAKING NEWS
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold text-white mt-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-gray-200 mt-6 text-lg">
            {post.excerpt ||
              "Stay informed with trusted news and breaking stories from around the world."}
          </p>

          <Link
            href={`/news/${post.slug}`}
            className="inline-flex mt-8 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 transition text-white font-semibold"
          >
            Read Full Story →
          </Link>
        </motion.div>

      </div>

      {/* Left Arrow */}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 flex items-center justify-center text-white transition"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 flex items-center justify-center text-white transition"
      >
        <ChevronRight />
      </button>

      {/* Indicators */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">

        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all rounded-full h-3 ${
              current === index
                ? "w-8 bg-white"
                : "w-3 bg-white/50"
            }`}
          />
        ))}

      </div>

    </section>
  );
}