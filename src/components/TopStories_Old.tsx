"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  slug: string;
  image?: string | null;
  excerpt?: string | null;
  category?: {
    name: string;
  } | null;
}

export default function TopStories({
  posts,
}: {
  posts: Post[];
}) {
  if (!posts || posts.length === 0) return null;

  const hero = posts[0];
  const sidePosts = posts.slice(1, 4);

  return (
    <section>

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-4xl font-bold text-slate-900">
          Top Stories
        </h2>

        <Link
          href="/latest"
          className="text-red-600 font-semibold hover:underline"
        >
          View All →
        </Link>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Large Story */}

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.25 }}
          className="lg:col-span-2 rounded-3xl overflow-hidden bg-white shadow-xl"
        >

          <Link href={`/news/${hero.slug}`}>

            <div className="relative h-[420px]">

              <Image
                src={hero.image || "/placeholder.jpg"}
                alt={hero.title}
                fill
                sizes="(max-width:768px)100vw,66vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">

                <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">

                  {hero.category?.name || "Top Story"}

                </span>

                <h2 className="text-white text-4xl font-bold mt-4 leading-tight">

                  {hero.title}

                </h2>

              </div>

            </div>

          </Link>

        </motion.div>

        {/* Side Stories */}

        <div className="space-y-6">

          {sidePosts.map((post) => (

            <motion.div
              key={post.id}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >

              <Link href={`/news/${post.slug}`}>

                <div className="flex">

                  <div className="relative w-36 h-32 flex-shrink-0">

                    <Image
                      src={post.image || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />

                  </div>

                  <div className="p-4 flex flex-col justify-center">

                    <span className="text-red-600 text-xs font-bold uppercase">

                      {post.category?.name || "News"}

                    </span>

                    <h3 className="font-bold text-lg mt-2 line-clamp-2">

                      {post.title}

                    </h3>

                  </div>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
