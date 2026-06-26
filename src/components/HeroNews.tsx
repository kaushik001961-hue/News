"use client";

import Image from "next/image";
import Link from "next/link";

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
if (!posts || posts.length === 0) return null;

const featured = posts[0];
const sideStories = posts.slice(1, 5);

return ( <section className="max-w-7xl mx-auto px-4 py-8"> <div className="grid lg:grid-cols-3 gap-6">

    {/* Featured Story */}

    <Link
      href={`/news/${featured.slug}`}
      className="lg:col-span-2 group"
    >
      <div className="relative h-[520px] overflow-hidden rounded-3xl">

        <Image
          src={featured.image || "/placeholder.jpg"}
          alt={featured.title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-0 p-8">

          <span className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            🔴 Featured Story
          </span>

          <h1 className="mt-5 text-3xl md:text-5xl font-bold text-white leading-tight">
            {featured.title}
          </h1>

          <p className="mt-4 text-gray-200 text-lg line-clamp-2 max-w-3xl">
            {featured.excerpt}
          </p>

        </div>

      </div>
    </Link>

    {/* Top Stories */}

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Top Stories
        </h2>

        <span className="text-red-600 font-semibold">
          Trending
        </span>

      </div>

      <div className="space-y-5">

        {sideStories.map((story, index) => (
          <Link
            key={story.id}
            href={`/news/${story.slug}`}
            className="flex gap-4 group"
          >
            <div className="text-red-600 font-bold text-lg">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-red-600 transition line-clamp-2">
                {story.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                AGS News
              </p>
            </div>
          </Link>
        ))}

      </div>

    </div>

  </div>
</section>
);
}
