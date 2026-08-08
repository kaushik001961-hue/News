"use client";

import { useEffect, useMemo, useState } from "react";

import StatsGrid from "@/components/dashboard/StatsGrid";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import RecentPosts from "@/components/dashboard/RecentPosts";
import RecentReporters from "@/components/dashboard/RecentReporters";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import { RefreshCw } from "lucide-react";

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
  reporterId?: string;

  firstName: string;
  lastName: string;

  email: string;

  district?: string;
  state?: string;

  status: string;

  active: boolean;

  createdAt: string;
}

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [reporters, setReporters] = useState<Reporter[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [postsRes, reportersRes] =
        await Promise.all([
          fetch("/api/admin/posts"),
          fetch("/api/admin/reporters"),
        ]);

      const postsJson = await postsRes.json();
      const reportersJson =
        await reportersRes.json();

      setPosts(postsJson.posts ?? []);
      setReporters(
        reportersJson.reporters ?? []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredPosts = useMemo(() => {
    if (!search) return posts;

    return posts.filter((post) => {
      return (
        post.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (post.author?.name ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (post.category?.name ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [posts, search]);

  const totalPosts = posts.length;

  const publishedPosts =
    posts.filter(
      (p) => p.status === "PUBLISHED"
    ).length;

  const draftPosts =
    posts.filter(
      (p) => p.status === "DRAFT"
    ).length;

  const pendingPosts =
    posts.filter((p) =>
      ["PENDING", "UNDER_REVIEW"].includes(
        p.status
      )
    ).length;

  const totalReporters =
    reporters.length;

  const approvedReporters =
    reporters.filter(
      (r) => r.status === "APPROVED"
    ).length;

  const activeReporters =
    reporters.filter(
      (r) => r.active
    ).length;

  const totalCategories = new Set(
    posts
      .map((p) => p.category?.name)
      .filter(Boolean)
  ).size;

  // Temporary chart data
  // Later this will come from Prisma

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

  if (loading) {
    return <DashboardSkeleton />;
  }

    return (

     <div className="space-y-8">

{/* Header */}

<div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <h1 className="text-4xl font-bold">
        ADMIN DASHBOARD
      </h1>

      <p className="mt-2 text-blue-100">
        Manage news, reporters, categories and monitor your newsroom from one place.
      </p>

    </div>

    <div className="flex gap-3">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search articles..."
        className="w-72 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-blue-100 outline-none backdrop-blur"
      />

      <button
        onClick={loadDashboard}
        className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-blue-700 transition hover:bg-blue-50"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </button>

    </div>

  </div>

</div>
        

        {/* Statistics */}
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

        {/* Analytics */}
        <AnalyticsCharts
          publishingData={publishingData}
          categoryData={categoryData}
        />

        {/* Posts & Reporters */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">

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

        {/* Quick Actions */}

        <QuickActions />

        {/* Activity Timeline */}

        <ActivityTimeline
          activities={activities}
        />

      </div>

     );
}