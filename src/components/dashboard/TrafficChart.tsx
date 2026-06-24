"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", views: 1200 },
  { day: "Tue", views: 1800 },
  { day: "Wed", views: 900 },
  { day: "Thu", views: 2400 },
  { day: "Fri", views: 3200 },
  { day: "Sat", views: 2700 },
  { day: "Sun", views: 3500 },
];

export default function TrafficChart() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="mb-4 text-xl font-bold">
        Weekly Traffic
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="views"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
