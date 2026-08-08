"use client";

import {
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
  CalendarClock,
  Archive,
  Flame,
  Star,
} from "lucide-react";

interface NewsStatusBadgeProps {
  status:
    | "DRAFT"
    | "PENDING"
    | "PUBLISHED"
    | "REJECTED"
    | "ARCHIVED"
    | "SCHEDULED";
  featured?: boolean;
  breaking?: boolean;
}

export default function NewsStatusBadge({
  status,
  featured = false,
  breaking = false,
}: NewsStatusBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2">

      {status === "PUBLISHED" && (
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          <CheckCircle2 size={14} />
          Published
        </span>
      )}

      {status === "PENDING" && (
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
          <Clock3 size={14} />
          Pending
        </span>
      )}

      {status === "DRAFT" && (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
          <FileText size={14} />
          Draft
        </span>
      )}

      {status === "REJECTED" && (
        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          <XCircle size={14} />
          Rejected
        </span>
      )}

      {status === "ARCHIVED" && (
        <span className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
          <Archive size={14} />
          Archived
        </span>
      )}

      {status === "SCHEDULED" && (
        <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          <CalendarClock size={14} />
          Scheduled
        </span>
      )}

      {featured && (
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          <Star size={14} />
          Featured
        </span>
      )}

      {breaking && (
        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          <Flame size={14} />
          Breaking
        </span>
      )}

    </div>
  );
}