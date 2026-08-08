"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", views: 12500, published: 42 },
  { month: "Feb", views: 15600, published: 58 },
  { month: "Mar", views: 18100, published: 61 },
  { month: "Apr", views: 21000, published: 73 },
  { month: "May", views: 24500, published: 88 },
  { month: "Jun", views: 28300, published: 96 },
  { month: "Jul", views: 34200, published: 118 },
];

export default function ViewsChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            News Performance
          </h2>

          <p className="text-sm text-slate-500">
            Monthly views & published news
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Last 7 Months
        </div>

      </div>

      <div className="h-96">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="viewsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#2563eb"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />
              </linearGradient>

            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="views"
              stroke="#2563eb"
              strokeWidth={4}
              fill="url(#viewsGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}