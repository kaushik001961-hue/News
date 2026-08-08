"use client";

import clsx from "clsx";

export type NewsStatus =
  | "DRAFT"
  | "PENDING"
  | "PUBLISHED"
  | "REJECTED"
  | "ARCHIVED";

interface Props {
  status: NewsStatus;
}

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    DRAFT:
      "bg-slate-100 text-slate-700 border-slate-200",

    PENDING:
      "bg-yellow-100 text-yellow-700 border-yellow-200",

    PUBLISHED:
      "bg-green-100 text-green-700 border-green-200",

    REJECTED:
      "bg-red-100 text-red-700 border-red-200",

    ARCHIVED:
      "bg-purple-100 text-purple-700 border-purple-200",
  };

  return (
    <span
      className={clsx(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}