"use client";

import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  page,
  totalPages,
  baseUrl,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-8">

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((p) => (
        <Link
          key={p}
          href={`${baseUrl}?page=${p}`}
          className={`rounded-lg px-4 py-2 ${
            page === p
              ? "bg-blue-600 text-white"
              : "border hover:bg-slate-100"
          }`}
        >
          {p}
        </Link>
      ))}

    </div>
  );
}