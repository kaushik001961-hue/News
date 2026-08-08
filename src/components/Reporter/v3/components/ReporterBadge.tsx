"use client";

import { BadgeCheck, Newspaper } from "lucide-react";
import { ReporterCardData } from "../ReporterIdCardV3";

interface ReporterBadgeProps {
  reporter: ReporterCardData;
}

const BADGE_COLORS: Record<string, string> = {
  EDITOR:
    "from-purple-700 via-purple-600 to-purple-800",
  "CHIEF EDITOR":
    "from-purple-700 via-purple-600 to-purple-800",

  REPORTER:
    "from-red-700 via-red-600 to-red-800",

  "STAFF REPORTER":
    "from-red-700 via-red-600 to-red-800",

  JOURNALIST:
    "from-blue-700 via-blue-600 to-blue-800",

  CORRESPONDENT:
    "from-emerald-700 via-emerald-600 to-emerald-800",

  DEFAULT:
    "from-red-700 via-red-600 to-red-800",
};

export default function ReporterBadge({
  reporter,
}: ReporterBadgeProps) {
  const designation =
    reporter.designation?.trim().toUpperCase() || "REPORTER";

  const gradient =
    BADGE_COLORS[designation] || BADGE_COLORS.DEFAULT;

  return (
    <div className="rounded-2xl bg-white/80 p-3 shadow-lg backdrop-blur">
      {/* Heading */}
      <div className="mb-2 flex items-center gap-2">
        <BadgeCheck
          size={18}
          className="text-yellow-500"
        />

        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
          Official Status
        </span>
      </div>

      {/* Main Badge */}
      <div
        className={`rounded-xl bg-gradient-to-r ${gradient} p-[2px] shadow-lg`}
      >
        <div className="flex items-center justify-center gap-2 rounded-[10px] bg-black/10 px-4 py-3 backdrop-blur">
          <Newspaper
            size={18}
            className="text-yellow-300"
          />

          <span className="text-sm font-bold uppercase tracking-widest text-white">
            {designation}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between rounded-lg border border-yellow-300/40 bg-yellow-50 px-3 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-600">
          Press Accreditation
        </span>

        <span className="rounded-full bg-emerald-600 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
          Active
        </span>
      </div>
    </div>
  );
}