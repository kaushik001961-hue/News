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

export default function Sidebar({ trending }: Props) {
  return (
    <div className="space-y-6">
      {/* ========================= */}
      {/* TRENDING NOW */}
      {/* ========================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-red-600" size={18} />
          <h3 className="font-bold text-lg">Trending Now</h3>
        </div>

        <div className="space-y-3">
          {trending.map((post, index) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="flex gap-3 group items-start"
            >
              <span className="text-red-600 font-bold text-sm min-w-[18px]">
                {index + 1}
              </span>

              <span className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-2 leading-snug">
                {post.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* MOST READ */}
      {/* ========================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-red-600" size={18} />
          <h3 className="font-bold text-lg">Most Read</h3>
        </div>

        <div className="space-y-3">
          {trending.slice(0, 5).map((post, index) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="flex gap-3 group items-center"
            >
              <div className="text-2xl font-bold text-gray-300 min-w-[28px]">
                {index + 1}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-2 leading-snug">
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
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-2xl text-white p-5 shadow-md">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse"></span>
          <Tv size={18} />
          <h3 className="font-bold text-base">LIVE TV</h3>
        </div>

        <h4 className="text-xl font-bold mt-3">AGS News Live</h4>

        <p className="mt-1 text-gray-400 text-xs">
          Watch breaking news coverage 24×7.
        </p>

        <button className="mt-4 w-full bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl text-sm font-semibold">
          Watch Now
        </button>
      </div>

      {/* ========================= */}
      {/* POPULAR TOPICS */}
      {/* ========================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Tag size={16} />
          <h3 className="font-bold text-lg">Popular Topics</h3>
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
            <Link
              key={tag}
              href={`/category/${tag.toLowerCase()}`}
              className="px-3 py-1 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition text-xs font-medium text-gray-700"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* NEWSLETTER */}
      {/* ========================= */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md">
        <h3 className="text-lg font-bold">Daily Newsletter</h3>

        <p className="text-gray-400 mt-1 text-xs">
          Get the latest headlines delivered to your inbox.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mt-4 rounded-xl px-3 py-2 text-sm text-black outline-none bg-white"
        />

        <button className="w-full mt-3 bg-red-600 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition text-sm font-semibold">
          Subscribe
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}