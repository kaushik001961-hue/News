"use client";

import {
  UserPlus,
  Pencil,
  CheckCircle2,
  XCircle,
  Ban,
  ShieldCheck,
  CreditCard,
  FileCheck,
  Newspaper,
  KeyRound,
  Clock3,
  CalendarClock,
} from "lucide-react";

interface ReporterActivity {
  id: string;
  action: string;
  title: string;
  description?: string | null;
  performedBy?: string | null;
  remarks?: string | null;
  createdAt: string;
}

interface Reporter {
  activities?: ReporterActivity[];
}

interface Props {
  reporter: Reporter;
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function relativeTime(date: string) {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;

  return `${Math.floor(seconds / 86400)} days ago`;
}

function getActivityIcon(action: string) {
  switch (action) {
    case "REGISTERED":
      return UserPlus;

    case "PROFILE_UPDATED":
      return Pencil;

    case "APPROVED":
      return CheckCircle2;

    case "REJECTED":
      return XCircle;

    case "BLOCKED":
    case "SUSPENDED":
      return Ban;

    case "ACTIVATED":
      return ShieldCheck;

    case "PRESS_CARD_GENERATED":
      return CreditCard;

    case "DOCUMENT_VERIFIED":
      return FileCheck;

    case "NEWS_CREATED":
    case "NEWS_PUBLISHED":
      return Newspaper;

    case "PASSWORD_CHANGED":
      return KeyRound;

    default:
      return Clock3;
  }
}

function getActivityColor(action: string) {
  switch (action) {
    case "REGISTERED":
      return "bg-blue-600";

    case "PROFILE_UPDATED":
      return "bg-amber-500";

    case "APPROVED":
      return "bg-green-600";

    case "REJECTED":
      return "bg-red-600";

    case "BLOCKED":
    case "SUSPENDED":
      return "bg-rose-600";

    case "ACTIVATED":
      return "bg-emerald-600";

    case "PRESS_CARD_GENERATED":
      return "bg-indigo-600";

    case "DOCUMENT_VERIFIED":
      return "bg-violet-600";

    case "NEWS_CREATED":
      return "bg-cyan-600";

    case "NEWS_PUBLISHED":
      return "bg-sky-600";

    case "PASSWORD_CHANGED":
      return "bg-orange-600";

    default:
      return "bg-slate-600";
  }
}

export default function ReporterTimeline({
  reporter,
}: Props) {

  const activities = reporter?.activities ?? [];


  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b bg-gradient-to-r from-slate-50 to-white px-6 py-5">

        <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <Clock3 className="h-6 w-6 text-blue-600" />
          Reporter Timeline
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Complete activity history of this reporter.
        </p>

      </div>

      <div className="p-8">

        <div className="relative border-l-2 border-slate-200">

          {activities.length === 0 ? (

            <div className="ml-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

              <CalendarClock className="mx-auto mb-4 h-12 w-12 text-slate-400" />

              <h3 className="text-lg font-semibold text-slate-700">
                No Timeline Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Timeline events will appear here once activity is recorded.
              </p>

            </div>

          ) : (

            activities.map((activity) => {

              const Icon = getActivityIcon(activity.action);

              const color = getActivityColor(activity.action);
                            return (
                <div
                  key={activity.id}
                  className="relative mb-10 ml-8 last:mb-0"
                >
                  <span
                    className={`absolute -left-[49px] flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-white shadow-lg ${color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                      <div className="flex-1">

                        <h3 className="text-lg font-semibold text-slate-900">
                          {activity.title}
                        </h3>

                        {activity.description && (
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {activity.description}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                            {activity.action}
                          </span>

                          {activity.performedBy && (
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                              By: {activity.performedBy}
                            </span>
                          )}

                        </div>

                        {activity.remarks && (
                          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <p className="text-sm text-amber-900">
                              <strong>Remarks:</strong> {activity.remarks}
                            </p>
                          </div>
                        )}

                      </div>

                      <div className="text-right">

                        <div className="text-sm font-semibold text-slate-900">
                          {formatDate(activity.createdAt)}
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          {relativeTime(activity.createdAt)}
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );

            })

          )}

        </div>

      </div>

    </div>
  );
}