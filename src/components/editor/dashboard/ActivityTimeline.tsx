"use client";

import {
  Newspaper,
  Pencil,
  UserPlus,
  ImageIcon,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Breaking News Published",
    description: "Government announces new education policy",
    time: "5 mins ago",
    icon: Newspaper,
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Draft Updated",
    description: "Heavy Rainfall Alert in Gujarat",
    time: "18 mins ago",
    icon: Pencil,
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Reporter Submitted News",
    description: "Kaushik Bhatt submitted a new article",
    time: "35 mins ago",
    icon: UserPlus,
    color: "bg-purple-600",
  },
  {
    id: 4,
    title: "Images Uploaded",
    description: "5 new images added to Media Library",
    time: "1 hour ago",
    icon: ImageIcon,
    color: "bg-pink-600",
  },
  {
    id: 5,
    title: "News Approved",
    description: "Sports article approved by Editor",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "bg-green-600",
  },
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-100 px-6 py-5">

        <h2 className="text-2xl font-bold text-slate-900">
          Newsroom Activity
        </h2>

        <p className="text-sm text-slate-500">
          Latest newsroom updates
        </p>

      </div>

      {/* Timeline */}

      <div className="p-6">

        <div className="space-y-6">

          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="relative flex gap-5"
              >

                {/* Timeline */}

                <div className="relative flex flex-col items-center">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg ${activity.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  {activity.id !== activities.length && (
                    <div className="mt-2 h-full w-0.5 bg-slate-200" />
                  )}

                </div>

                {/* Content */}

                <div className="flex-1 pb-8">

                  <div className="flex items-center justify-between">

                    <h3 className="font-bold text-slate-900">
                      {activity.title}
                    </h3>

                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock3 size={14} />
                      {activity.time}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    {activity.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}