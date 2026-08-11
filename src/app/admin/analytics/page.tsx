"use client";

import { useEffect, useState } from "react";

import TrafficChart from "@/components/dashboard/TrafficChart";

interface AnalyticsData {
  news: {
    total: number;
    published: number;
    draft: number;
    pending: number;
    views: number;
  };

  reporters: {
    total: number;
    approved: number;
    pending: number;
  };

  advertisements: {
    impressions: number;
    clicks: number;
    ctr: number;
  };

  categoryData: {
    name: string;
    value: number;
  }[];

  recentNews: {
    id: string;
    title: string;
    status: string;
    views: number;
    createdAt: string;
  }[];
}

export default function AnalyticsPage() {
  const [data, setData] =
    useState<AnalyticsData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          "/api/admin/analytics",
          {
            cache: "no-store",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Failed to load analytics."
        );
      }

      setData(result);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load analytics."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          <p className="mt-4 text-sm text-slate-500">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Unable to load analytics
        </h2>

        <p className="mt-1 text-sm text-red-600">
          {error ||
            "No analytics data available."}
        </p>

        <button
          onClick={loadAnalytics}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const trafficData = [
    {
      label: "Total",
      value: data.news.views,
    },
    {
      label: "Published",
      value: data.news.published,
    },
    {
      label: "Draft",
      value: data.news.draft,
    },
    {
      label: "Pending",
      value: data.news.pending,
    },
    {
      label: "Reporters",
      value: data.reporters.total,
    },
    {
      label: "Ad Clicks",
      value: data.advertisements.clicks,
    },
    {
      label: "Ad Views",
      value:
        data.advertisements.impressions,
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">

        <h1 className="text-4xl font-black tracking-tight">
          ANALYTICS
        </h1>

        <p className="mt-2 max-w-2xl text-blue-100">
          Monitor news performance,
          reporters, advertisements and
          overall portal activity.
        </p>

      </section>

      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total News"
          value={data.news.total}
        />

        <StatCard
          title="Published News"
          value={data.news.published}
        />

        <StatCard
          title="News Views"
          value={data.news.views}
        />

        <StatCard
          title="Total Reporters"
          value={data.reporters.total}
        />

        <StatCard
          title="Approved Reporters"
          value={
            data.reporters.approved
          }
        />

        <StatCard
          title="Ad Impressions"
          value={
            data.advertisements.impressions
          }
        />

        <StatCard
          title="Ad Clicks"
          value={
            data.advertisements.clicks
          }
        />

        <StatCard
          title="Advertisement CTR"
          value={`${data.advertisements.ctr}%`}
        />

      </div>

      {/* Traffic */}

      <TrafficChart
        data={trafficData}
        title="Portal Analytics"
        description="Current news, reporter and advertisement activity"
      />

      {/* Categories */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            News by Category
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Number of news articles in each
            category.
          </p>
        </div>

        <div className="mt-6 space-y-4">

          {data.categoryData.length ===
          0 ? (
            <p className="text-sm text-slate-500">
              No category data available.
            </p>
          ) : (
            data.categoryData.map(
              (category) => {
                const total =
                  data.news.total || 1;

                const percentage =
                  Math.round(
                    (category.value /
                      total) *
                      100
                  );

                return (
                  <div
                    key={category.name}
                  >
                    <div className="mb-1 flex items-center justify-between">

                      <span className="text-sm font-medium text-slate-700">
                        {category.name}
                      </span>

                      <span className="text-sm font-semibold text-slate-900">
                        {category.value}
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${Math.min(
                            percentage,
                            100
                          )}%`,
                        }}
                      />

                    </div>
                  </div>
                );
              }
            )
          )}

        </div>

      </section>

      {/* Recent News */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-xl font-bold text-slate-900">
            Recent News
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest news activity.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr className="text-left text-xs font-semibold uppercase text-slate-500">

                <th className="px-6 py-4">
                  News
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Views
                </th>

                <th className="px-6 py-4">
                  Created
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {data.recentNews.map(
                (news) => (
                  <tr
                    key={news.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 font-medium text-slate-900">
                      {news.title}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {news.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {news.views.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(
                        news.createdAt
                      ).toLocaleDateString(
                        "en-IN"
                      )}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-black text-slate-900">
        {typeof value === "number"
          ? value.toLocaleString()
          : value}
      </p>

    </div>
  );
}