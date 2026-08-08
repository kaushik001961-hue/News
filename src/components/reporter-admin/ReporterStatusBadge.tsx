"use client";

import {
  CheckCircle2,
  Clock3,
  XCircle,
  Ban,
} from "lucide-react";

export type ReporterStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED";

interface ReporterStatusBadgeProps {
  status: ReporterStatus;
}

export default function ReporterStatusBadge({
  status,
}: ReporterStatusBadgeProps) {
  switch (status) {
    case "APPROVED":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
          <CheckCircle2 size={15} />
          Approved
        </span>
      );

    case "PENDING":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
          <Clock3 size={15} />
          Pending
        </span>
      );

    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
          <XCircle size={15} />
          Rejected
        </span>
      );

    case "SUSPENDED":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
          <Ban size={15} />
          Suspended
        </span>
      );

    default:
      return null;
  }
}