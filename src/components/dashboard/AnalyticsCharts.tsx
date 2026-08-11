"use client";

interface PublishingData {
  month: string;
  published: number;
  drafts: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface AnalyticsChartsProps {
  publishingData: PublishingData[];
  categoryData: CategoryData[];
}

export default function AnalyticsCharts({
  publishingData,
  categoryData,
}: AnalyticsChartsProps) {
  const maxPublishingValue = Math.max(
    ...publishingData.flatMap((item) => [
      item.published,
      item.drafts,
    ]),
    1
  );

  const totalCategoryValue = categoryData.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <section className="grid gap-6 xl:grid-cols-3">
      {/* ==================================================
          PUBLISHING ANALYTICS
      ================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Publishing Analytics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Published articles and drafts
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600" />
              Published
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              Drafts
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex h-64 items-end gap-3 sm:gap-6">
            {publishingData.map((item) => {
              const publishedHeight =
                (item.published /
                  maxPublishingValue) *
                100;

              const draftHeight =
                (item.drafts /
                  maxPublishingValue) *
                100;

              return (
                <div
                  key={item.month}
                  className="flex min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <div className="flex h-52 w-full items-end justify-center gap-1 sm:gap-2">
                    <div
                      title={`${item.published} published`}
                      className="w-3 rounded-t-lg bg-blue-600 transition-all duration-300 hover:bg-blue-700 sm:w-6"
                      style={{
                        height: `${Math.max(
                          publishedHeight,
                          4
                        )}%`,
                      }}
                    />

                    <div
                      title={`${item.drafts} drafts`}
                      className="w-3 rounded-t-lg bg-slate-300 transition-all duration-300 hover:bg-slate-400 sm:w-6"
                      style={{
                        height: `${Math.max(
                          draftHeight,
                          4
                        )}%`,
                      }}
                    />
                  </div>

                  <span className="mt-3 text-xs font-medium text-slate-500">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================================================
          CATEGORY ANALYTICS
      ================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Category Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            News by category
          </p>
        </div>

        <div className="mt-6 space-y-5">
          {categoryData.map((item) => {
            const percentage =
              totalCategoryValue > 0
                ? Math.round(
                    (item.value /
                      totalCategoryValue) *
                      100
                  )
                : 0;

            return (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {item.name}
                  </span>

                  <span className="text-xs font-semibold text-slate-500">
                    {item.value}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {categoryData.length === 0 && (
          <div className="flex h-56 items-center justify-center">
            <p className="text-sm text-slate-400">
              No category data available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}