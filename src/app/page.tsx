import Link from "next/link";
import EditorsPicks from "@/components/EditorsPicks";
import HeroNews from "@/components/HeroNews";
import BreakingTicker from "@/components/BreakingTicker";
import TrendingBar from "@/components/TrendingBar";
import TopStories from "@/components/TopStories";
import LatestNews from "@/components/LatestNews";
import CategorySection from "@/components/CategorySection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // ===========================
  // BREAKING NEWS & TOP STORIES
  // ===========================

  const topStories = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { views: "desc" },
    take: 4,
  });

  const latestPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const trendingPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { views: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  const breakingPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  const heroPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { category: true },
  });

  // ===========================
  // CATEGORIES
  // ===========================

  const politicsPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: { slug: "politics" },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const businessPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: { slug: "business" },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const sportsPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: { slug: "sports" },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const technologyPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: { slug: "technology" },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <>
      {/* Hero */}
      <HeroNews posts={heroPosts as any} />

      {/* Breaking News */}
      <section className="max-w-7xl mx-auto px-4 mt-2">
        <BreakingTicker posts={breakingPosts as any} />
      </section>

      {/* Trending Bar */}
      <TrendingBar posts={trendingPosts as any} />

      {/* Top Stories */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <TopStories posts={topStories as any} />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-10">
            <LatestNews posts={latestPosts as any} />

            <CategorySection
              title="Politics"
              posts={politicsPosts as any}
            />

            <CategorySection
              title="Business"
              posts={businessPosts as any}
            />

            <CategorySection
              title="Sports"
              posts={sportsPosts as any}
            />

            <CategorySection
              title="Technology"
              posts={technologyPosts as any}
            />

            {/* Editor Picks */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  Editor's Picks
                </h2>

                <span className="text-red-600 font-semibold text-sm">
                  Curated Stories
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {latestPosts.slice(0, 2).map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    <div className="relative h-56">
                      <img
                        src={post.image || "/placeholder.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>

                    <div className="p-5">
                      <span className="inline-block bg-red-100 text-red-600 px-3 py-0.5 rounded-full text-xs font-semibold">
                        {post.category?.name || "News"}
                      </span>

                      <h3 className="mt-3 text-xl font-bold line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 sticky top-20 self-start">
            <Sidebar trending={trendingPosts as any} />

            {/* Weather */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-3">
                Weather
              </h3>

              <div className="text-4xl font-bold">
                32°
              </div>

              <p className="text-gray-500 text-sm mt-1">
                Amirgadh, Gujarat
              </p>
            </div>

            {/* Market Watch */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-3">
                Market Watch
              </h3>

              <div className="space-y-3 text-sm">
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
          </aside>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}