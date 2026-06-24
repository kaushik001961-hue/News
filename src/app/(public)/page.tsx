import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
const featured = await prisma.post.findFirst({
  where: {
    status: "PUBLISHED",
    featured: true,
  },
  orderBy: {
    updatedAt: "desc",
  },
});

const breakingPosts = await prisma.post.findMany({
  where: {
    status: "PUBLISHED",
    breaking: true,
  },
  orderBy: {
    updatedAt: "desc",
  },
  take: 5,
});

const latest = await prisma.post.findMany({
  where: {
    status: "PUBLISHED",
    featured: false,
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 12,
});

  return (
    <main className="min-h-screen bg-gray-100">

     {breakingPosts.length > 0 && (
  <div className="bg-red-600 text-white py-3 px-6 overflow-hidden">
    <div className="font-semibold">
      BREAKING:
      {" "}
      {breakingPosts.map((post) => post.title).join(" • ")}
    </div>
  </div>
)}      
      {/* HERO SECTION */}
      {featured && (
        <section className="relative h-[500px] overflow-hidden">
          <Image
            src={featured.image || "/news.jpg"}
            alt={featured.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/60 flex items-end">
            <div className="p-8 text-white max-w-4xl">
              <p className="text-red-500 font-semibold mb-2">
                BREAKING NEWS
              </p>

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {featured.title}
              </h1>

              <p className="text-lg text-gray-200 mb-4 line-clamp-2">
                {featured.content.slice(0, 120)}...
              </p>

              <Link
                href={`/news/${featured.slug}`}
                className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium"
              >
                Read Full Story
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* LATEST NEWS */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            Latest News
          </h2>

          <Link
            href="/news"
            className="text-red-600 font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map((post) => (
         <article
  key={post.id}
  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
>

<div className="relative h-56 overflow-hidden">

  {/* News Image */}
  <Image
    src={post.image || "/news.jpg"}
    alt={post.title}
    fill
    className="object-cover"
  />

  {/* Logo Container */}
  <div className="absolute top-2 left-2 z-[9999]">
  <Image
  src="/ags-logo.png"
  alt="AGS Logo"
  width={180}
  height={60}
  loading="eager"
/>
  </div>

</div>

  <div className="p-5">
    <h3 className="text-xl font-bold mb-3 line-clamp-2">
      {post.title}
    </h3>

    <p className="text-gray-600 mb-4 line-clamp-3">
      {post.content.slice(0, 120)}...
    </p>

    <Link
      href={`/news/${post.slug}`}
      className="text-red-600 font-semibold hover:underline"
    >
      Read More →
    </Link>
  </div>

</article>
          ))}
        </div>
      </section>
    </main>
  );
}