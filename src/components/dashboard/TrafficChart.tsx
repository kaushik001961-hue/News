"use client";

interface TrafficPoint {
  label: string;
  value: number;
}

interface TrafficChartProps {
  data?: TrafficPoint[];
  title?: string;
  description?: string;
}

const defaultData: TrafficPoint[] = [
  { label: "Mon", value: 420 },
  { label: "Tue", value: 680 },
  { label: "Wed", value: 540 },
  { label: "Thu", value: 820 },
  { label: "Fri", value: 760 },
  { label: "Sat", value: 940 },
  { label: "Sun", value: 880 },
];

export default function TrafficChart({
  data = defaultData,
  title = "Portal Traffic",
  description = "Visitor traffic over the selected period",
}: TrafficChartProps) {
  const safeData =
    data.length > 0 ? data : defaultData;

  const maxValue = Math.max(
    ...safeData.map((item) => item.value),
    1
  );

  const total = safeData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const average = Math.round(
    total / safeData.length
  );

  const highest = Math.max(
    ...safeData.map((item) => item.value)
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-4 py-2">
          <p className="text-xs font-medium text-slate-500">
            Average
          </p>

          <p className="text-lg font-bold text-blue-600">
            {average.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Total Visits
          </p>

          <p className="mt-1 text-2xl font-black text-slate-900">
            {total.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Peak Traffic
          </p>

          <p className="mt-1 text-2xl font-black text-slate-900">
            {highest.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8">
        <div className="flex h-64 items-end gap-3 sm:gap-5">
          {safeData.map((item) => {
            const percentage =
              (item.value / maxValue) * 100;

            return (
              <div
                key={item.label}
                className="flex min-w-0 flex-1 flex-col items-center justify-end"
              >
                <div className="mb-2 text-xs font-semibold text-slate-500">
                  {item.value.toLocaleString()}
                </div>

                <div className="flex h-48 w-full items-end justify-center">
                  <div
                    title={`${item.label}: ${item.value}`}
                    className="w-full max-w-10 rounded-t-xl bg-gradient-to-t from-blue-600 to-indigo-500 transition-all duration-500 hover:from-blue-700 hover:to-purple-600"
                    style={{
                      height: `${Math.max(
                        percentage,
                        4
                      )}%`,
                    }}
                  />
                </div>

                <span className="mt-3 text-xs font-semibold text-slate-500">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />

        <span className="text-xs text-slate-500">
          Portal visitor traffic
        </span>
      </div>
    </section>
  );
}