"use client";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Dashboard Header Skeleton */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-xl">
        <div className="animate-pulse">
          <div className="h-10 w-80 rounded-lg bg-white/20" />

          <div className="mt-4 h-5 max-w-2xl rounded bg-white/20" />

          <div className="mt-2 h-5 w-96 rounded bg-white/20" />
        </div>
      </section>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="animate-pulse">
              <div className="h-10 w-10 rounded-xl bg-slate-200" />

              <div className="mt-5 h-4 w-28 rounded bg-slate-200" />

              <div className="mt-3 h-8 w-20 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="h-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="animate-pulse">
            <div className="h-6 w-48 rounded bg-slate-200" />

            <div className="mt-6 h-56 rounded-xl bg-slate-100" />
          </div>
        </div>

        <div className="h-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse">
            <div className="h-6 w-40 rounded bg-slate-200" />

            <div className="mx-auto mt-8 h-48 w-48 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>

      {/* Recent Posts / Reporters */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="h-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="animate-pulse">
            <div className="h-6 w-48 rounded bg-slate-200" />

            <div className="mt-6 space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-slate-200" />

                  <div className="flex-1">
                    <div className="h-4 w-3/4 rounded bg-slate-200" />

                    <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse">
            <div className="h-6 w-40 rounded bg-slate-200" />

            <div className="mt-6 space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-12 rounded-xl bg-slate-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="h-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="animate-pulse">
            <div className="h-6 w-48 rounded bg-slate-200" />

            <div className="mt-6 space-y-4">
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-5/6 rounded bg-slate-100" />
              <div className="h-4 w-4/6 rounded bg-slate-100" />
            </div>
          </div>
        </div>

        <div className="h-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse">
            <div className="h-6 w-40 rounded bg-slate-200" />

            <div className="mt-6 space-y-3">
              <div className="h-10 rounded-xl bg-slate-100" />
              <div className="h-10 rounded-xl bg-slate-100" />
              <div className="h-10 rounded-xl bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}