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
import { prisma } from '@/lib/prisma'

export default async function Home() {
// ALL YOUR EXISTING PRISMA QUERIES REMAIN EXACTLY THE SAME

// ===========================
// BREAKING NEWS
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

const heroPosts = await prisma.post.findMany({
  where: {
    status: "PUBLISHED",
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 5,
  include: {
    category: true,
  },
});

// ===========================
// POLITICS
// ===========================

const politicsPosts = await prisma.post.findMany({
  where: {
    status: "PUBLISHED",
    category: {
      slug: "politics",
    },
  },
  include: {
    category: true,
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 4,
});

// ===========================
// BUSINESS
// ===========================

const businessPosts = await prisma.post.findMany({
  where: {
    status: "PUBLISHED",
    category: {
      slug: "business",
    },
  },
  include: {
    category: true,
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 4,
});

// ===========================
// SPORTS
// ===========================

const sportsPosts = await prisma.post.findMany({
  where: {
    status: "PUBLISHED",
    category: {
      slug: "sports",
    },
  },
  include: {
    category: true,
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 4,
});

// ===========================
// TECHNOLOGY
// ===========================

const technologyPosts = await prisma.post.findMany({
  where: {
    status: "PUBLISHED",
    category: {
      slug: "technology",
    },
  },
  include: {
    category: true,
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 4,
});

return (
  <>
    {/* Hero */}
    <HeroNews posts={heroPosts} />

    {/* Breaking News */}
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <BreakingTicker posts={breakingPosts} />
    </section>

    {/* Trending Bar */}
    <TrendingBar />

    {/* Top Stories */}
    <section className="max-w-7xl mx-auto px-4 py-12">
      <TopStories posts={topStories} />
    </section>

    {/* Main Content */}
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid lg:grid-cols-12 gap-10">

        {/* Left Content */}
        <div className="lg:col-span-8 space-y-20">

          <LatestNews posts={latestPosts} />

          <CategorySection
            title="Politics"
            posts={politicsPosts}
          />

          <CategorySection
            title="Business"
            posts={businessPosts}
          />

          <CategorySection
            title="Sports"
            posts={sportsPosts}
          />

          <CategorySection
            title="Technology"
            posts={technologyPosts}
          />


          {/* Editor Picks */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">
                Editor's Picks
              </h2>

              <span className="text-red-600 font-semibold">
                Curated Stories
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              {latestPosts.slice(0, 2).map((post: any) => (

                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                >

                  <div className="relative h-72">

                    <img
                      src={post.image || "/placeholder.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                  </div>

                  <div className="p-6">

                    <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">

                      {post.category?.name || "News"}

                    </span>

                    <h3 className="mt-4 text-2xl font-bold line-clamp-2">

                      {post.title}

                    </h3>

                    <p className="mt-3 text-gray-600 line-clamp-3">

                      {post.excerpt}

                    </p>

                  </div>

                </Link>

              ))}

            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">

          <Sidebar trending={trendingPosts} />

          {/* Weather */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="font-bold text-xl mb-4">
              Weather
            </h3>

            <div className="text-5xl font-bold">
              32°
            </div>

            <p className="text-gray-500 mt-2">
              Amirgadh, Gujarat
            </p>

          </div>

          {/* Market Watch */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="font-bold text-xl mb-4">
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

        </aside>

      </div>
    </section>

    <Newsletter />

    <Footer />
  </>
);
}
