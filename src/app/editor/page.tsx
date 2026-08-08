import {
  RefreshCw,
  Search,
} from "lucide-react";

import StatsCards from "@/components/editor/dashboard/StatsCards";
import QuickActions from "@/components/editor/dashboard/QuickActions";
import RecentArticles from "@/components/editor/dashboard/RecentArticles";
import PendingReviews from "@/components/editor/dashboard/PendingReviews";
import ViewsChart from "@/components/editor/dashboard/ViewsChart";
import ActivityTimeline from "@/components/editor/dashboard/ActivityTimeline";
import BreakingNewsWidget from "@/components/editor/dashboard/BreakingNewsWidget";
import CategoryChart from "@/components/editor/dashboard/CategoryChart";

export default function EditorDashboardPage() {
  return (
    <div className="space-y-8">

      {/* Hero */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-4xl font-black tracking-tight">
              EDITOR DASHBOARD
            </h1>

            <p className="mt-3 max-w-2xl text-lg text-blue-100">
              Review, edit and publish news submitted by reporters.
              Monitor newsroom activity and manage today's stories.
            </p>

          </div>

          <div className="flex gap-4">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70"
              />

              <input
                placeholder="Search news..."
                className="h-14 w-72 rounded-2xl border border-white/20 bg-white/10 pl-12 pr-4 text-white placeholder:text-white/70 outline-none backdrop-blur-md"
              />

            </div>

            <button className="flex h-14 items-center gap-2 rounded-2xl bg-white px-6 font-semibold text-blue-700 shadow-lg transition hover:scale-105">

              <RefreshCw size={18} />

              Refresh

            </button>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <StatsCards />

      {/* Quick Actions */}

      <QuickActions />

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <ViewsChart />
        </div>

        <CategoryChart />

      </div>

      {/* Recent News */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RecentArticles />
        </div>

        <PendingReviews />

      </div>

      {/* Bottom */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <ActivityTimeline />
        </div>

        <BreakingNewsWidget />

      </div>

    </div>
  );
}