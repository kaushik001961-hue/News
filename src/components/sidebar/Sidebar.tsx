
"use client";

import Link from "next/link";
import { Flame, Tv, Tag, ArrowRight } from "lucide-react";

interface TrendingPost {
  id: string;
  title: string;
  slug: string;
}

interface Props {
  trending: TrendingPost[];
}

export default function Sidebar({
  trending,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Trending */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-2 mb-5">

          <Flame className="text-red-600" size={20} />

          <h3 className="font-bold text-xl">
            Trending
          </h3>

        </div>

        <div className="space-y-4">

          {trending.map((post, index) => (

            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="flex gap-3 group"
            >

              <span className="text-red-600 font-bold text-lg">
                {index + 1}
              </span>

              <span className="group-hover:text-red-600 transition">
                {post.title}
              </span>

            </Link>

          ))}

        </div>

      </div>

      {/* Live TV */}

      <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl text-white p-6">

        <div className="flex items-center gap-2">

          <Tv size={22} />

          <h3 className="font-bold text-xl">
            Live TV
          </h3>

        </div>

        <p className="mt-4 text-sm text-red-100">
          Watch live news coverage from AGS News.
        </p>

        <button className="mt-5 bg-white text-red-600 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
          Watch Live
        </button>

      </div>

      {/* Popular Tags */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-2 mb-5">

          <Tag size={18} />

          <h3 className="font-bold text-xl">
            Popular Topics
          </h3>

        </div>

        <div className="flex flex-wrap gap-2">

          {[
            "Politics",
            "AI",
            "Technology",
            "Business",
            "Sports",
            "Markets",
            "India",
            "World",
          ].map((tag) => (

            <span
              key={tag}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition cursor-pointer text-sm"
            >
              {tag}
            </span>

          ))}

        </div>

      </div>

      {/* Newsletter */}

      <div className="bg-black text-white rounded-3xl p-6">

        <h3 className="text-2xl font-bold">
          Daily Newsletter
        </h3>

        <p className="text-gray-300 mt-3 text-sm">
          Get the latest news delivered every morning.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mt-5 rounded-xl px-4 py-3 text-black outline-none"
        />

        <button className="w-full mt-4 bg-red-600 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition">

          Subscribe

          <ArrowRight size={16} />

        </button>

      </div>

    </div>
  );
}
