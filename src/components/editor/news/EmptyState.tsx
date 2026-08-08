"use client";

import Link from "next/link";
import { FileText, Plus, Search, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  type?: "empty" | "search" | "filter";
  title?: string;
  description?: string;
  createHref?: string;
  onReset?: () => void;
}

export default function EmptyState({
  type = "empty",
  title,
  description,
  createHref = "/editor/news/create",
  onReset,
}: EmptyStateProps) {
  const config = {
    empty: {
      icon: FileText,
      title: "No news articles yet",
      description:
        "Start by creating your first news article for your newsroom.",
    },
    search: {
      icon: Search,
      title: "No matching articles found",
      description:
        "Try a different keyword or clear your search to see more results.",
    },
    filter: {
      icon: Search,
      title: "No articles match the selected filters",
      description:
        "Adjust or reset the filters to display more articles.",
    },
  };

  const current = {
    ...config[type],
    title: title ?? config[type].title,
    description: description ?? config[type].description,
  };

  const Icon = current.icon;

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
        <Icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
        {current.title}
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-slate-500 dark:text-slate-400">
        {current.description}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {type === "empty" && (
          <Link
            href={createHref}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Create First Article
          </Link>
        )}

        {(type === "search" || type === "filter") && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-5 w-5" />
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}