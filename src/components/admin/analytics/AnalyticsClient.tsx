"use client";

import { Eye, FileText, Folder, Users, TrendingUp, BarChart3 } from "lucide-react";

interface AnalyticsClientProps {
  stats: {
    totalPosts: number;
    publishedPosts: number;
    totalViews: number;
    totalCategories: number;
    totalReporters: number;
  };
  topArticles: any[];
  categories: any[];
}

export default function AnalyticsClient({
  stats,
  topArticles,
  categories,
}: AnalyticsClientProps) {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-sm text-gray-500">
          Overview of traffic, content performance, and system metrics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Eye size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Total Views</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.totalViews.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Published Articles</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.publishedPosts} <span className="text-xs text-gray-400">/ {stats.totalPosts}</span>
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Folder size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Categories</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalCategories}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Active Reporters</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalReporters}</h3>
          </div>
        </div>
      </div>

      {/* Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Articles Table */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
            <TrendingUp className="text-blue-600" size={20} />
            <h2>Top Performing Articles</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                  <th className="py-3 px-2">Title</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2 text-right">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {topArticles.length > 0 ? (
                  topArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-2 font-medium text-gray-900 line-clamp-1">
                        {article.title}
                      </td>
                      <td className="py-3 px-2 text-gray-500">
                        {article.category?.name || "Uncategorized"}
                      </td>
                      <td className="py-3 px-2 text-right font-semibold text-blue-600">
                        {article.views.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-400">
                      No published articles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Share List */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
            <BarChart3 className="text-purple-600" size={20} />
            <h2>Articles per Category</h2>
          </div>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{cat.name}</span>
                  <span className="text-gray-500 font-semibold">{cat._count?.posts || 0}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full"
                    style={{
                      width: `${Math.min(
                        ((cat._count?.posts || 0) / (stats.totalPosts || 1)) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}