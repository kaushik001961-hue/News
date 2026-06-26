"use client";

import Link from "next/link";
import {
  Flame,
  Tv,
  Tag,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

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

      {/* ========================= */}
      {/* TRENDING NOW */}
      {/* ========================= */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-2 mb-5">
          <Flame className="text-red-600" size={20} />
          <h3 className="font-bold text-xl">
            Trending Now
          </h3>
        </div>

        <div className="space-y-4">

          {trending.map((post, index) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="flex gap-4 group"
            >
              <span className="text-red-600 font-bold text-xl min-w-[24px]">
                {index + 1}
              </span>

              <span className="text-gray-800 group-hover:text-red-600 transition line-clamp-2">
                {post.title}
              </span>
            </Link>
          ))}

        </div>

      </div>

      {/* ========================= */}
      {/* MOST READ */}
      {/* ========================= */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="text-red-600" size={20} />
          <h3 className="font-bold text-xl">
            Most Read
          </h3>
        </div>

        <div className="space-y-4">

          {trending.slice(0, 5).map((post, index) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="flex gap-4 group"
            >
              <div className="text-3xl font-bold text-gray-200 min-w-[35px]">
                {index + 1}
              </div>

              <div>
                <p className="font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-2">
                  {post.title}
                </p>
              </div>
            </Link>
          ))}

        </div>

      </div>

      {/* ========================= */}
      {/* LIVE TV */}
      {/* ========================= */}

      <div className="bg-gradient-to-br from-slate-900 via-black to-slate-900 rounded-3xl text-white p-6 shadow-xl">

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>

          <Tv size={22} />

          <h3 className="font-bold text-xl">
            LIVE TV
          </h3>

        </div>

        <h4 className="text-2xl font-bold mt-5">
          AGS News Live
        </h4>

        <p className="mt-3 text-gray-400">
          Watch breaking news coverage 24×7.
        </p>

        <button className="mt-6 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full font-semibold">
          Watch Now
        </button>

      </div>

      {/* ========================= */}
      {/* MARKET WATCH */}
      {/* ========================= */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h3 className="font-bold text-xl mb-5">
          Market Watch
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Nifty 50</span>
            <span className="text-green-600 font-semibold">
              +1.24%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Sensex</span>
            <span className="text-green-600 font-semibold">
              +0.92%
            </span>
          </div>

          <div className="flex justify-between">
            <span>Gold</span>
            <span className="font-semibold">
              ₹98,200
            </span>
          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* POPULAR TOPICS */}
      {/* ========================= */}

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
            "Technology",
            "Business",
            "Sports",
            "AI",
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

      {/* ========================= */}
      {/* NEWSLETTER */}
      {/* ========================= */}

      <div className="bg-black text-white rounded-3xl p-6">

        <h3 className="text-2xl font-bold">
          Daily Newsletter
        </h3>

        <p className="text-gray-300 mt-3 text-sm">
          Get the latest headlines delivered to your inbox.
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