"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Politics",
    value: 32,
  },
  {
    name: "Sports",
    value: 21,
  },
  {
    name: "Technology",
    value: 17,
  },
  {
    name: "Business",
    value: 14,
  },
  {
    name: "Entertainment",
    value: 10,
  },
  {
    name: "Local",
    value: 6,
  },
];

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#ea580c",
  "#9333ea",
  "#e11d48",
  "#0891b2",
];

export default function CategoryChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          News Categories
        </h2>

        <p className="text-sm text-slate-500">
          Distribution of published news
        </p>

      </div>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-6 space-y-3">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-sm font-medium text-slate-700">
                {item.name}
              </span>

            </div>

            <span className="font-bold text-slate-900">
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}