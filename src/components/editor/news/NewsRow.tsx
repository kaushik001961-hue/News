"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
  Copy,
  Archive,
  Upload,
  MoreVertical,
  Star,
  Flame,
} from "lucide-react";

import NewsStatusBadge from "./NewsStatusBadge";

import type { NewsItem } from "./NewsTable";

interface NewsRowProps {
  article: NewsItem;

  selected: boolean;

  onToggle: () => void;

  onDelete: () => void;
}

export default function NewsRow({
  article,
  selected,
  onToggle,
  onDelete,
}: NewsRowProps) {
  const reporter =
    article.assignedReporter?.reporter;

  const reporterName = reporter
    ? `${reporter.firstName} ${reporter.lastName}`
    : article.assignedReporter?.name ??
      "-";

  return (
    <tr className="border-t border-slate-100 transition hover:bg-slate-50">

      {/* Checkbox */}

      <td className="px-6 py-5">

        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="h-4 w-4 rounded border-slate-300"
        />

      </td>

      {/* News */}

      <td className="px-6 py-5">

        <div className="flex items-center gap-4">

          <div className="relative h-16 w-24 overflow-hidden rounded-xl bg-slate-100">

            <Image
              src={
                article.image ||
                "/images/news-placeholder.jpg"
              }
              alt={article.title}
              fill
              className="object-cover"
            />

          </div>

          <div className="min-w-0">

            <h3 className="line-clamp-2 font-semibold text-slate-900">
              {article.title}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              /{article.slug}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">

              {article.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">

                  <Star size={12} />

                  Featured

                </span>
              )}

              {article.breaking && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">

                  <Flame size={12} />

                  Breaking

                </span>
              )}

              {article.hero && (
                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700">
                  Hero
                </span>
              )}

              {article.editorsPick && (
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  Editor's Pick
                </span>
              )}

            </div>

          </div>

        </div>

      </td>

      {/* Category */}

      <td className="px-6 py-5">

        {article.category ? (
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            {article.category.name}
          </span>
        ) : (
          <span className="text-slate-400">
            —
          </span>
        )}

      </td>

      {/* Reporter */}

      <td className="px-6 py-5">

        <div>

          <p className="font-medium text-slate-900">
            {reporterName}
          </p>

          {reporter?.designation && (
            <p className="text-xs text-slate-500">
              {reporter.designation}
            </p>
          )}

        </div>

      </td>

      {/* Views */}

      <td className="px-6 py-5 font-semibold">

        {article.views.toLocaleString()}

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <NewsStatusBadge
          status={article.status}
          featured={article.featured}
          breaking={article.breaking}
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
            href={`/editor/news/preview/${article.id}`}
            className="rounded-lg p-2 transition hover:bg-slate-100"
            title="Preview"
          >
            <Eye size={18} />
          </Link>

          <Link
            href={`/editor/news/edit/${article.id}`}
            className="rounded-lg p-2 transition hover:bg-slate-100"
            title="Edit"
          >
            <Pencil size={18} />
          </Link>

          {article.status !== "PUBLISHED" && (
            <button
              className="rounded-lg p-2 transition hover:bg-green-100 hover:text-green-600"
              title="Publish"
            >
              <Upload size={18} />
            </button>
          )}

          <button
            className="rounded-lg p-2 transition hover:bg-blue-100 hover:text-blue-600"
            title="Duplicate"
          >
            <Copy size={18} />
          </button>

          {article.status !== "ARCHIVED" && (
            <button
              className="rounded-lg p-2 transition hover:bg-yellow-100 hover:text-yellow-700"
              title="Archive"
            >
              <Archive size={18} />
            </button>
          )}

          <button
            onClick={onDelete}
            className="rounded-lg p-2 transition hover:bg-red-100 hover:text-red-600"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>

          <button
            className="rounded-lg p-2 transition hover:bg-slate-100"
            title="More"
          >
            <MoreVertical size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}