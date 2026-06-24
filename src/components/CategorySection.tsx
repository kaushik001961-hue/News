
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  slug: string;
  image?: string | null;
}

interface Props {
  title: string;
  posts: Post[];
}

export default function CategorySection({
  title,
  posts,
}: Props) {
  if (!posts || posts.length === 0) return null;

  const hero = posts[0];
  const side = posts.slice(1, 5);

  return (
    <section className="py-14">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-4xl font-bold">
          {title}
        </h2>

        <Link
          href={`/category/${title.toLowerCase()}`}
          className="text-red-600 font-semibold hover:underline"
        >
          View All →
        </Link>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Hero */}

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl overflow-hidden shadow-xl"
        >

          <Link href={`/news/${hero.slug}`}>

            <div className="relative h-[420px]">

              <Image
                src={hero.image || "/placeholder.jpg"}
                alt={hero.title}
                fill
                sizes="50vw"
                className="object-cover hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"/>

              <div className="absolute bottom-8 left-8 right-8">

                <h2 className="text-white text-4xl font-bold">

                  {hero.title}

                </h2>

              </div>

            </div>

          </Link>

        </motion.div>

        {/* Right Grid */}

        <div className="grid grid-cols-2 gap-5">

          {side.map((post) => (

            <motion.div
              key={post.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >

              <Link href={`/news/${post.slug}`}>

                <div className="relative h-44">

                  <Image
                    src={post.image || "/placeholder.jpg"}
                    alt={post.title}
                    fill
                    sizes="25vw"
                    className="object-cover hover:scale-105 transition duration-700"
                  />

                </div>

                <div className="p-4">

                  <h3 className="font-bold line-clamp-2">

                    {post.title}

                  </h3>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
