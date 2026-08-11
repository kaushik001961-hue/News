"use client";

import {
  CheckCircle2,
  FileText,
  UserPlus,
  Clock3,
  Activity,
} from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type:
    | "article"
    | "approval"
    | "reporter"
    | "default";
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

function getActivityIcon(
  type: ActivityItem["type"]
) {
  switch (type) {
    case "article":
      return (
        <FileText className="h-5 w-5" />
      );

    case "approval":
      return (
        <CheckCircle2 className="h-5 w-5" />
      );

    case "reporter":
      return (
        <UserPlus className="h-5 w-5" />
      );

    default:
      return (
        <Activity className="h-5 w-5" />
      );
  }
}

function getActivityStyle(
  type: ActivityItem["type"]
) {
  switch (type) {
    case "article":
      return "bg-blue-50 text-blue-600";

    case "approval":
      return "bg-emerald-50 text-emerald-600";

    case "reporter":
      return "bg-purple-50 text-purple-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest activity across your newsroom
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Activity className="h-5 w-5" />
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8">
        {activities.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center text-center">
            <div>
              <Clock3 className="mx-auto h-8 w-8 text-slate-300" />

              <p className="mt-3 text-sm font-medium text-slate-500">
                No recent activity
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute bottom-5 left-5 top-5 w-px bg-slate-200" />

            <div className="space-y-7">
              {activities.map(
                (activity, index) => (
                  <div
                    key={activity.id}
                    className="relative flex gap-4"
                  >
                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getActivityStyle(
                        activity.type
                      )}`}
                    >
                      {getActivityIcon(
                        activity.type
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-semibold text-slate-900">
                          {activity.title}
                        </h3>

                        <span className="text-xs text-slate-400">
                          {activity.time}
                        </span>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}