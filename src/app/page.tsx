import { prisma } from "@/lib/prisma";

import HeroNews from "@/components/HeroNews";
import BreakingTicker from "@/components/BreakingTicker";
import TopStories from "@/components/TopStories";
import LatestNews from "@/components/LatestNews";
import CategorySection from "@/components/CategorySection";
import TrendingNews from "@/components/TrendingNews";
import LiveTV from "@/components/LiveTV";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default async function Home() {

  // ===========================
  // HERO SLIDER
  // ===========================

  const heroPostsData = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  // Convert Date instances to strings for component compatibility
  const heroPosts = heroPostsData.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  // ===========================
  // BREAKING NEWS
  // ===========================

  const breakingPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  // ===========================
  // TOP STORIES
  // ===========================

  const topStoriesData = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: true,
    },
    orderBy: {
      views: "desc",
    },
    take: 4,
  });

  const topStories = topStoriesData.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  // ===========================
  // LATEST NEWS
  // ===========================

  const latestPostsData = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });

  const latestPosts = latestPostsData.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  // ===========================
  // TRENDING
  // ===========================

  const trendingPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      views: "desc",
    },
    take: 5,
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  // ===========================
  // POLITICS
  // ===========================

  const politicsPostsData = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: {
        slug: "politics",
      },
    },
    include: {
      category: true,
    },
    take: 4,
  });

  const politicsPosts = politicsPostsData.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  // ===========================
  // BUSINESS
  // ===========================

  const businessPostsData = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: {
        slug: "business",
      },
    },
    include: {
      category: true,
    },
    take: 4,
  });

  const businessPosts = businessPostsData.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  // ===========================
  // SPORTS
  // ===========================

  const sportsPostsData = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: {
        slug: "sports",
      },
    },
    include: {
      category: true,
    },
    take: 4,
  });

  const sportsPosts = sportsPostsData.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  // ===========================
  // TECHNOLOGY
  // ===========================

  const technologyPostsData = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: {
        slug: "technology",
      },
    },
    include: {
      category: true,
    },
    take: 4,
  });

  const technologyPosts = technologyPostsData.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  return (
    <>
      {/* ========================== */}
      {/* FULL SCREEN HERO */}
      {/* ========================== */}

      <HeroNews posts={heroPosts} />

      {/* ========================== */}
      {/* BREAKING TICKER */}
      {/* ========================== */}

      <section className="max-w-7xl mx-auto px-4 mt-8">
        <BreakingTicker posts={breakingPosts} />
      </section>

      {/* ========================== */}
      {/* TOP STORIES */}
      {/* ========================== */}

      <section className="max-w-7xl mx-auto px-4 py-16">
        <TopStories posts={topStories} />
      </section>

      {/* ========================== */}
      {/* MAIN GRID START */}
      {/* ========================== */}

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* ======================= */}
          {/* LEFT COLUMN */}
          {/* ======================= */}

          <div className="lg:col-span-2 space-y-16">

            {/* ======================= */}
            {/* LATEST NEWS */}
            {/* ======================= */}

            <LatestNews posts={latestPosts} />

            {/* ======================= */}
            {/* POLITICS */}
            {/* ======================= */}

            <CategorySection
              title="Politics"
              posts={politicsPosts}
            />

            {/* ======================= */}
            {/* BUSINESS */}
            {/* ======================= */}

            <CategorySection
              title="Business"
              posts={businessPosts}
            />

            {/* ======================= */}
            {/* SPORTS */}
            {/* ======================= */}

            <CategorySection
              title="Sports"
              posts={sportsPosts}
            />

            {/* ======================= */}
            {/* TECHNOLOGY */}
            {/* ======================= */}

            <CategorySection
              title="Technology"
              posts={technologyPosts}
            />

            {/* ======================= */}
            {/* EDITOR'S PICK SECTION */}
            {/* ======================= */}

            <section className="py-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold text-slate-900">
                  Editor's Picks
                </h2>
                <span className="text-red-600 font-semibold">
                  Curated Stories
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {latestPosts.slice(0, 2).map((post: any) => (
                  <div
                    key={post.id}
                    className="rounded-3xl overflow-hidden bg-white shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <img
                      src={post.image || "/placeholder.jpg"}
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />

                    <div className="p-7">
                      <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category?.name || "News"}
                      </span>

                      <h3 className="text-2xl font-bold mt-4 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mt-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ======================= */}
          {/* SIDEBAR START */}
          {/* ======================= */}

          <aside className="space-y-8 sticky top-28 self-start">

            {/* ======================= */}
            {/* TRENDING NEWS */}
            {/* ======================= */}

            <TrendingNews posts={trendingPosts} />

            {/* ======================= */}
            {/* LIVE TV */}
            {/* ======================= */}

            <LiveTV />

            {/* ======================= */}
            {/* QUICK STATS */}
            {/* ======================= */}

            <div className="rounded-3xl bg-white shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-8">
                Today's Highlights
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Breaking</span>
                  <span className="font-bold text-red-600">12+</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Politics</span>
                  <span className="font-bold">28</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Business</span>
                  <span className="font-bold">19</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Sports</span>
                  <span className="font-bold">14</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Technology</span>
                  <span className="font-bold">17</span>
                </div>
              </div>
            </div>

            {/* ======================= */}
            {/* ADVERTISEMENT */}
            {/* ======================= */}

            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-black p-8 text-center text-white shadow-xl">
              <h3 className="text-3xl font-bold">Advertise With AGS</h3>
              <p className="text-gray-300 mt-4">
                Reach thousands of daily readers.
              </p>
              <button className="mt-6 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full">
                Contact Sales
              </button>
            </div>

          </aside>

        </div>
      </section>

      {/* ========================== */}
      {/* NEWSLETTER */}
      {/* ========================== */}

      <Newsletter />

      {/* ========================== */}
      {/* FOOTER */}
      {/* ========================== */}

      <Footer />
    </>
  );
}