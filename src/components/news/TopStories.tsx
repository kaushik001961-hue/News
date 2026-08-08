"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  image?: string | null;
  category?: {
    name: string;
  } | null;
  createdAt?: Date | string;
}

interface Props {
  posts: Story[];
}

export default function TopStories({
  posts,
}: Props) {
  if (!posts || posts.length === 0) return null;

  const featured = posts[0];
  const sideStories = posts.slice(1);

  return (
    <section className="py-10">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            Top Stories
          </h2>

          <Link
            href="/news"
            className="text-red-600 font-semibold hover:underline"
          >
            View All →
          </Link>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Featured Story */}

          <Link
            href={`/news/${featured.slug}`}
            className="lg:col-span-2 group"
          >

            <div className="overflow-hidden rounded-3xl shadow-xl">

              <Image
                src={featured.image || "/placeholder.jpg"}
                alt={featured.title}
                width={900}
                height={550}
                className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-105"
              />

            </div>

            <div className="mt-5">

              <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs">

                {featured.category?.name || "News"}

              </span>

              <h3 className="text-3xl font-bold mt-4 group-hover:text-red-600 transition">

                {featured.title}

              </h3>

              <p className="text-gray-600 mt-3">

                {featured.excerpt ||
                  "Read the complete story for more details."}

              </p>

              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">

                <Clock size={14} />

                Latest Update

              </div>

            </div>

          </Link>

          {/* Side Stories */}

          <div className="space-y-6">

            {sideStories.map((story) => (

              <Link
                key={story.id}
                href={`/news/${story.slug}`}
                className="group flex gap-4"
              >

                <Image
                  src={story.image || "/placeholder.jpg"}
                  alt={story.title}
                  width={180}
                  height={120}
                  className="rounded-2xl object-cover w-[180px] h-[120px] transition duration-500 group-hover:scale-105"
                />

                <div>

                  <span className="text-xs text-red-600 font-semibold">

                    {story.category?.name || "News"}

                  </span>

                  <h4 className="font-bold mt-2 group-hover:text-red-600 transition">

                    {story.title}

                  </h4>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">

                    {story.excerpt ||
                      "Click to read the full article."}

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
