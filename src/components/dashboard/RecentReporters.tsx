"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  UserCheck,
  Users,
} from "lucide-react";

interface Reporter {
  id: string;
  reporterId?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  district?: string | null;
  state?: string | null;
  status: string;
  active: boolean;
  createdAt: string;
}

interface RecentReportersProps {
  reporters: Reporter[];
}

function getStatusClasses(status: string) {
  switch (status) {
    case "APPROVED":
      return "bg-emerald-50 text-emerald-700";

    case "PENDING":
      return "bg-amber-50 text-amber-700";

    case "REJECTED":
      return "bg-red-50 text-red-700";

    case "SUSPENDED":
      return "bg-slate-100 text-slate-600";

    default:
      return "bg-blue-50 text-blue-700";
  }
}

function formatDate(value: string) {
  if (!value) return "--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function RecentReporters({
  reporters,
}: RecentReportersProps) {
  const recentReporters = reporters.slice(0, 6);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Reporters
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest newsroom registrations
          </p>
        </div>

        <Link
          href="/admin/reporters"
          className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Reporter List */}
      <div className="divide-y divide-slate-100">
        {recentReporters.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <Users className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-700">
              No reporters found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              No reporter registrations are available.
            </p>
          </div>
        ) : (
          recentReporters.map((reporter) => {
            const fullName =
              `${reporter.firstName} ${reporter.lastName}`.trim();

            const location = [
              reporter.district,
              reporter.state,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <div
                key={reporter.id}
                className="group p-5 transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white">
                    {(
                      reporter.firstName?.charAt(0) ?? "R"
                    ).toUpperCase()}
                  </div>

                  {/* Information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-900 group-hover:text-blue-600">
                          {fullName || "Unnamed Reporter"}
                        </h3>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {reporter.reporterId ||
                            reporter.email}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
                          reporter.status
                        )}`}
                      >
                        {reporter.status.replace(
                          /_/g,
                          " "
                        )}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                      {location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {location}
                        </span>
                      )}

                      <span>
                        {formatDate(reporter.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Active indicator */}
                  {reporter.active && (
                    <div
                      title="Active reporter"
                      className="hidden h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 sm:flex"
                    >
                      <UserCheck className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {recentReporters.length > 0 && (
        <div className="border-t border-slate-100 p-4">
          <Link
            href="/admin/reporters"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Manage Reporters
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}