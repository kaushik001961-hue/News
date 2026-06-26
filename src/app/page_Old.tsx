import Link from "next/link";

import HeroNews from "@/components/HeroNews";
import TopStories from "@/components/TopStories";
import LatestNews from "@/components/LatestNews";
import { prisma } from "@/lib/prisma";
import BreakingTicker from "@/components/BreakingTicker";
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
    <HeroNews posts={heroPosts} />

    <section className="max-w-7xl mx-auto px-4 mt-8">
      <BreakingTicker posts={breakingPosts} />
    </section>

    <section className="max-w-7xl mx-auto px-4 py-12">
     <div>Top Stories Section</div>
    </section>

    <section className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid lg:grid-cols-12 gap-10">

        <div className="lg:col-span-8 space-y-20">
          <LatestNews posts={latestPosts} />
          <CategorySection title="Politics" posts={politicsPosts} />
          <CategorySection title="Business" posts={businessPosts} />
          <CategorySection title="Sports" posts={sportsPosts} />
          <CategorySection title="Technology" posts={technologyPosts} />
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <TrendingNews posts={trendingPosts} />
          <LiveTV />
        </aside>

      </div>
    </section>

    <Newsletter />
    <Footer />
  </>
);
}