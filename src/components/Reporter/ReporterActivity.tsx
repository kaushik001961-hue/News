"use client";

import {
  CheckCircle2,
  Clock3,
  FileEdit,
  Newspaper,
  User,
  XCircle,
} from "lucide-react";

export interface ReporterActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type:
    | "published"
    | "pending"
    | "draft"
    | "profile"
    | "rejected";
}

interface Props {
  activities: ReporterActivityItem[];
}

function ActivityIcon({
  type,
}: {
  type: ReporterActivityItem["type"];
}) {
  switch (type) {
    case "published":
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2
            size={22}
            className="text-green-600"
          />
        </div>
      );

    case "pending":
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100">
          <Clock3
            size={22}
            className="text-yellow-600"
          />
        </div>
      );

    case "draft":
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
          <Newspaper
            size={22}
            className="text-blue-600"
          />
        </div>
      );

    case "profile":
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100">
          <User
            size={22}
            className="text-purple-600"
          />
        </div>
      );

    case "rejected":
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
          <XCircle
            size={22}
            className="text-red-600"
          />
        </div>
      );

    default:
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
          <FileEdit
            size={22}
            className="text-slate-600"
          />
        </div>
      );
  }
}

export default function ReporterActivity({
  activities,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest updates from your account
        </p>

      </div>

      {activities.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          No recent activity available.
        </div>
      ) : (
        <div className="p-6">

          <div className="space-y-6">

            {activities.map((activity) => (

              <div
                key={activity.id}
                className="flex gap-4"
              >

                <ActivityIcon
                  type={activity.type}
                />

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-slate-900">
                      {activity.title}
                    </h3>

                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-slate-600">
                    {activity.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      )}

    </div>
  );
}