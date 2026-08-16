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

import SideAdvertisements from "@/components/advertisements/SideAdvertisements";
import PopupAdvertisement from "@/components/advertisements/PopupAdvertisement";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  /* =====================================================
     NEWS DATA
  ===================================================== */

  const topStories =
    await prisma.post.findMany({
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

  const latestPosts =
    await prisma.post.findMany({
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

  const trendingPosts =
    await prisma.post.findMany({
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

  const breakingPosts =
    await prisma.post.findMany({
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

    OR: [
      {
        hero: true,
      },
      {
        video: {
          not: null,
        },
      },
    ],
  },

  orderBy: [
    {
      hero: "desc",
    },
    {
      createdAt: "desc",
    },
  ],

  take: 5,

  include: {
    category: true,
  },
});
  /* =====================================================
     CATEGORIES
  ===================================================== */

  const politicsPosts =
    await prisma.post.findMany({
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

  const businessPosts =
    await prisma.post.findMany({
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

  const sportsPosts =
    await prisma.post.findMany({
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

  const technologyPosts =
    await prisma.post.findMany({
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

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <>
      {/* =================================================
          SIDE ADVERTISEMENTS
          
          Uses only:
          SIDEBAR_TOP_LEFT
          SIDEBAR_TOP_RIGHT
      ================================================= */}

      <SideAdvertisements />

      {/* =================================================
          POPUP ADVERTISEMENT
          
          Uses:
          POPUP
      ================================================= */}

      <PopupAdvertisement />

      {/* =================================================
          HERO
      ================================================= */}

      <HeroNews
        posts={heroPosts as any}
      />

      {/* =================================================
          BREAKING NEWS
      ================================================= */}

      <section className="mx-auto mt-2 max-w-7xl px-4">
        <BreakingTicker
          posts={breakingPosts as any}
        />
      </section>

      {/* =================================================
          TRENDING
      ================================================= */}

      <TrendingBar
        posts={trendingPosts as any}
      />

      {/* =================================================
          TOP STORIES
      ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-4">
        <TopStories
          posts={topStories as any}
        />
      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid gap-6 lg:grid-cols-12">

          {/* =============================================
              LEFT CONTENT
          ============================================= */}

          <div className="space-y-10 lg:col-span-8">

            {/* =========================================
                LATEST NEWS
            ========================================= */}

            <LatestNews
              posts={latestPosts as any}
            />

            {/* =========================================
                POLITICS
            ========================================= */}

            <CategorySection
              title="Politics"
              posts={
                politicsPosts as any
              }
            />

            {/* =========================================
                BUSINESS
            ========================================= */}

            <CategorySection
              title="Business"
              posts={
                businessPosts as any
              }
            />

            {/* =========================================
                SPORTS
            ========================================= */}

            <CategorySection
              title="Sports"
              posts={
                sportsPosts as any
              }
            />

            {/* =========================================
                TECHNOLOGY
            ========================================= */}

            <CategorySection
              title="Technology"
              posts={
                technologyPosts as any
              }
            />

            {/* =========================================
                EDITOR'S PICKS
            ========================================= */}

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Editor's Picks
                </h2>

                <span className="text-sm font-semibold text-red-600">
                  Curated Stories
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {latestPosts
                  .slice(0, 2)
                  .map(
                    (post: any) => (
                      <Link
                        key={post.id}
                        href={`/news/${post.slug}`}
                        className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
                      >
                        <div className="relative h-56">
                          <img
                            src={
                              post.image ||
                              "/placeholder.jpg"
                            }
                            alt={
                              post.title
                            }
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-5">
                          <span className="inline-block rounded-full bg-red-100 px-3 py-0.5 text-xs font-semibold text-red-600">
                            {post.category
                              ?.name ||
                              "News"}
                          </span>

                          <h3 className="mt-3 line-clamp-2 text-xl font-bold">
                            {post.title}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                            {post.excerpt}
                          </p>
                        </div>
                      </Link>
                    )
                  )}
              </div>
            </section>
          </div>

          {/* =============================================
              SIDEBAR
              
              No PublicAdvertisement calls here.
              SideAdvertisements handles the floating
              left/right advertisements.
          ============================================= */}

          <aside className="self-start space-y-6 lg:col-span-4 lg:sticky lg:top-20">

            {/* =========================================
                EXISTING SIDEBAR
            ========================================= */}

            <Sidebar
              trending={
                trendingPosts as any
              }
            />

            {/* =========================================
                WEATHER
            ========================================= */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">
                Weather
              </h3>

              <div className="text-4xl font-bold">
                32°
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Amirgadh, Gujarat
              </p>
            </div>

            {/* =========================================
                MARKET WATCH
            ========================================= */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">
                Market Watch
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>
                    Nifty 50
                  </span>

                  <span className="font-semibold text-green-600">
                    +1.24%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Sensex
                  </span>

                  <span className="font-semibold text-green-600">
                    +0.92%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Gold
                  </span>

                  <span className="font-semibold">
                    ₹98,200
                  </span>
                </div>

              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =================================================
          NEWSLETTER
      ================================================= */}

      <Newsletter />

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
}