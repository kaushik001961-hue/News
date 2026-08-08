"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Pencil,
  Trash2,
  Eye,
  Star,
  Flame,
  TrendingUp,
} from "lucide-react";

export interface NewsItem {
  id: string;
  title: string;
  slug?: string | null;
  status: "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED" | "ARCHIVED" | "SCHEDULED" | string;
  excerpt?: string | null;
  featuredImage?: string | null;
  featured?: boolean;
  breaking?: boolean;
  trending?: boolean;
  views: number;
  publishedAt?: string | Date | null;
  category?: {
    id?: string;
    name?: string;
  } | null;
  assignedReporter?: {
    id?: string;
    firstName?: string;
    lastName?: string;
  } | null;
  [key: string]: any;
}

interface Props {
  article: NewsItem;
  selected: boolean;

  onToggle: () => void;

  onDelete: () => void;
}

function StatusBadge({
  status,
}: {
  status: NewsItem["status"];
}) {
  const styles: Record<string, string> = {
    DRAFT:
      "bg-slate-100 text-slate-700",

    PENDING:
      "bg-amber-100 text-amber-700",

    PUBLISHED:
      "bg-green-100 text-green-700",

    REJECTED:
      "bg-red-100 text-red-700",

    ARCHIVED:
      "bg-slate-200 text-slate-700",

    SCHEDULED:
      "bg-violet-100 text-violet-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function NewsRow({
  article,
  selected,
  onToggle,
  onDelete,
}: Props) {
  return (
    <tr className="hover:bg-slate-50 transition">

      {/* Checkbox */}

      <td className="px-6 py-5">

        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="h-4 w-4 rounded"
        />

      </td>

      {/* News */}

      <td className="px-6 py-5">

        <div className="flex gap-4">

          <div className="relative h-20 w-32 overflow-hidden rounded-xl bg-slate-100">

            <Image
              src={
                article.featuredImage ||
                "/placeholder.jpg"
              }
              alt={article.title}
              fill
              sizes="128px"
              className="object-cover"
            />

          </div>

          <div className="min-w-0 flex-1">

            <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
              {article.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-xs text-slate-500">
              {article.excerpt || "No description"}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">

              {article.featured && (
                <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                  <Star size={12} />
                  Featured
                </span>
              )}

              {article.breaking && (
                <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">
                  <Flame size={12} />
                  Breaking
                </span>
              )}

              {article.trending && (
                <span className="flex items-center gap-1 rounded-full bg-cyan-100 px-2 py-1 text-xs text-cyan-700">
                  <TrendingUp size={12} />
                  Trending
                </span>
              )}

            </div>

          </div>

        </div>

      </td>

      {/* Category */}

      <td className="px-6 py-5">

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

          {article.category?.name ?? "-"}

        </span>

      </td>

      {/* Reporter */}

      <td className="px-6 py-5">

        <div className="text-sm">

          {article.assignedReporter
            ? `${article.assignedReporter.firstName ?? ""} ${article.assignedReporter.lastName ?? ""}`.trim()
            : "-"}

        </div>

      </td>

      {/* Views */}

      <td className="px-6 py-5">

        <span className="font-semibold">

          {(article.views ?? 0).toLocaleString()}

        </span>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <StatusBadge
          status={article.status}
        />

      </td>

      {/* Published */}

      <td className="px-6 py-5 text-sm text-slate-500">

        {article.publishedAt
          ? new Date(
              article.publishedAt
            ).toLocaleDateString()
          : "-"}

      </td>

      {/* Actions */}

      <td className="px-6 py-5">

        <div className="flex justify-end gap-2">

          <Link
            href={`/news/${article.slug ?? article.id}`}
            target="_blank"
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <Eye size={18} />
          </Link>

          <Link
            href={`/editor/news/edit/${article.id}`}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <Pencil
              size={18}
              className="text-blue-600"
            />
          </Link>

          <button
            onClick={onDelete}
            className="rounded-lg p-2 hover:bg-red-100"
          >
            <Trash2
              size={18}
              className="text-red-600"
            />
          </button>

        </div>

      </td>

    </tr>
  );
}