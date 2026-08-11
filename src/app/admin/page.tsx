"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";

import StatsGrid from "@/components/dashboard/StatsGrid";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import TrafficChart from "@/components/dashboard/TrafficChart";
import RecentPosts from "@/components/dashboard/RecentPosts";
import RecentReporters from "@/components/dashboard/RecentReporters";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

interface Author {
  name: string;
  email?: string;
}

interface Category {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  author?: Author;
  category?: Category | null;
}

interface Reporter {
  id: string;
  reporterId?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  district?: string | null;
  state?: string | null;
  status: string;
  active: boolean;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [reporters, setReporters] = useState<Reporter[]>([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* ========================================================
     LOAD DASHBOARD
  ======================================================== */

  async function loadDashboard() {
    try {
      setLoading(true);

      const [postsRes, reportersRes] = await Promise.all([
        fetch("/api/admin/posts", {
          cache: "no-store",
        }),

        fetch("/api/admin/reporters", {
          cache: "no-store",
        }),
      ]);

      if (!postsRes.ok) {
        throw new Error(
          `Posts API failed: ${postsRes.status}`
        );
      }

      if (!reportersRes.ok) {
        throw new Error(
          `Reporters API failed: ${reportersRes.status}`
        );
      }

      const postsJson = await postsRes.json();
      const reportersJson = await reportersRes.json();

      setPosts(postsJson.posts ?? []);
      setReporters(reportersJson.reporters ?? []);
    } catch (error) {
      console.error(
        "ADMIN DASHBOARD LOAD ERROR:",
        error
      );

      setPosts([]);
      setReporters([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  /* ========================================================
     SEARCH
  ======================================================== */

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(query) ||
        (post.author?.name ?? "")
          .toLowerCase()
          .includes(query) ||
        (post.category?.name ?? "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [posts, search]);

  /* ========================================================
     POST STATISTICS
  ======================================================== */

  const totalPosts = posts.length;

  const publishedPosts = posts.filter(
    (post) => post.status === "PUBLISHED"
  ).length;

  const draftPosts = posts.filter(
    (post) => post.status === "DRAFT"
  ).length;

  const pendingPosts = posts.filter(
    (post) =>
      post.status === "PENDING" ||
      post.status === "UNDER_REVIEW"
  ).length;

  /* ========================================================
     REPORTER STATISTICS
  ======================================================== */

  const totalReporters = reporters.length;

  const approvedReporters = reporters.filter(
    (reporter) => reporter.status === "APPROVED"
  ).length;

  const activeReporters = reporters.filter(
    (reporter) => reporter.active
  ).length;

  /* ========================================================
     CATEGORY STATISTICS
  ======================================================== */

  const totalCategories = new Set(
    posts
      .map((post) => post.category?.name)
      .filter(Boolean)
  ).size;

  /* ========================================================
     PUBLISHING CHART
  ======================================================== */

  const publishingData = [
    {
      month: "Jan",
      published: 12,
      drafts: 4,
    },
    {
      month: "Feb",
      published: 18,
      drafts: 3,
    },
    {
      month: "Mar",
      published: 26,
      drafts: 5,
    },
    {
      month: "Apr",
      published: 20,
      drafts: 2,
    },
    {
      month: "May",
      published: 34,
      drafts: 6,
    },
    {
      month: "Jun",
      published: 40,
      drafts: 3,
    },
  ];

  /* ========================================================
     CATEGORY CHART
  ======================================================== */

  const categoryData = [
    {
      name: "Politics",
      value: 28,
    },
    {
      name: "Sports",
      value: 19,
    },
    {
      name: "Business",
      value: 15,
    },
    {
      name: "Technology",
      value: 12,
    },
    {
      name: "Entertainment",
      value: 10,
    },
    {
      name: "Health",
      value: 8,
    },
  ];

  /* ========================================================
     ACTIVITY
  ======================================================== */

  const activities = [
    {
      id: "1",
      title: "Article Published",
      description:
        "Breaking news published.",
      time: "10 minutes ago",
      type: "article" as const,
    },

    {
      id: "2",
      title: "Reporter Approved",
      description:
        "Reporter approved successfully.",
      time: "35 minutes ago",
      type: "approval" as const,
    },

    {
      id: "3",
      title: "New Registration",
      description:
        "Reporter registration received.",
      time: "1 hour ago",
      type: "reporter" as const,
    },
  ];

  /* ========================================================
     LOADING
  ======================================================== */

  if (loading) {
    return <DashboardSkeleton />;
  }

  /* ========================================================
     DASHBOARD
  ======================================================== */

  return (
    <div className="space-y-8">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-4xl font-black tracking-tight">
              ADMIN DASHBOARD
            </h1>

            <p className="mt-3 max-w-2xl text-lg text-blue-100">
              Manage news, reporters, categories,
              advertisements and monitor your
              newsroom from one place.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Search */}
            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search news..."
                className="h-14 w-full rounded-2xl border border-white/20 bg-white/10 pl-12 pr-4 text-white placeholder:text-white/70 outline-none backdrop-blur-md sm:w-72"
              />

            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={loadDashboard}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 font-semibold text-blue-700 shadow-lg transition hover:scale-105 hover:bg-blue-50"
            >
              <RefreshCw size={18} />

              Refresh
            </button>

          </div>
        </div>
      </section>

      {/* ==================================================
          STATISTICS
      ================================================== */}

      <StatsGrid
        totalPosts={totalPosts}
        publishedPosts={publishedPosts}
        draftPosts={draftPosts}
        pendingPosts={pendingPosts}
        totalReporters={totalReporters}
        approvedReporters={approvedReporters}
        activeReporters={activeReporters}
        totalCategories={totalCategories}
      />

      {/* ==================================================
          QUICK ACTIONS
      ================================================== */}

      <QuickActions />

      {/* ==================================================
          ANALYTICS
      ================================================== */}

      <div className="grid gap-6 xl:grid-cols-3">

        {/* Publishing + Categories */}
        <div className="xl:col-span-2">
          <AnalyticsCharts
            publishingData={publishingData}
            categoryData={categoryData}
          />
        </div>

        {/* Traffic */}
        <div>
          <TrafficChart />
        </div>

      </div>

      {/* ==================================================
          TRAFFIC FULL WIDTH
      ================================================== */}

      <TrafficChart
        title="Portal Traffic Overview"
        description="Monitor visitor traffic across the portal"
      />

      {/* ==================================================
          RECENT POSTS + REPORTERS
      ================================================== */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RecentPosts
            posts={filteredPosts}
          />
        </div>

        <div>
          <RecentReporters
            reporters={reporters}
          />
        </div>

      </div>

      {/* ==================================================
          ACTIVITY
      ================================================== */}

      <ActivityTimeline
        activities={activities}
      />

    </div>
  );
}