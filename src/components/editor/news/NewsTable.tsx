"use client";

import { useState, useTransition } from "react";

import BulkActions from "./BulkActions";
import DeleteDialog from "./DeleteDialog";
import NewsRow from "./NewsRow";

import { bulkNewsAction } from "@/actions/news/bulk-actions";
import { deleteNewsAction } from "@/actions/news/delete-news";

export interface NewsItem {
  id: string;

  title: string;
  slug: string;

  excerpt?: string | null;

  image?: string | null;
  video?: string | null;

  featured: boolean;
  breaking: boolean;
  trending: boolean;
  hero: boolean;
  editorsPick: boolean;

  views: number;

  status:
    | "DRAFT"
    | "PENDING"
    | "PUBLISHED"
    | "REJECTED"
    | "ARCHIVED"
    | "SCHEDULED";

  publishedAt?: Date | null;

  createdAt: Date;
  updatedAt: Date;

  category?: {
    id: string;
    name: string;
  } | null;

  assignedReporter?: {
    id: string;
    name: string;
    reporter?: {
      reporterId?: string | null;
      firstName: string;
      lastName: string;
      designation?: string | null;
    } | null;
  } | null;
}

interface NewsTableProps {
  news: NewsItem[];
}

export default function NewsTable({
  news,
}: NewsTableProps) {
  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  const [deleteTitle, setDeleteTitle] =
    useState("");

  const [isPending, startTransition] =
    useTransition();

  const allSelected =
    news.length > 0 &&
    selectedIds.length === news.length;

  function toggleRow(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id]
    );
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(news.map((n) => n.id));
  }

  async function executeBulk(
    action:
      | "publish"
      | "draft"
      | "archive"
      | "restore"
      | "delete"
      | "feature"
      | "unfeature"
      | "breaking"
      | "unbreaking"
      | "trending"
      | "untrending"
  ) {
    startTransition(async () => {
      await bulkNewsAction({
        ids: selectedIds,
        action,
      });

      setSelectedIds([]);
    });
  }

  function confirmDelete(
    id: string,
    title: string
  ) {
    setDeleteId(id);
    setDeleteTitle(title);
  }

  async function performDelete() {
    if (!deleteId) return;

    startTransition(async () => {
      await deleteNewsAction({
        id: deleteId,
      });

      setDeleteId(null);
      setDeleteTitle("");
    });
  }

  if (!news.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white py-24 text-center shadow-sm">

        <h2 className="text-2xl font-bold">
          No News Found
        </h2>

        <p className="mt-3 text-slate-500">
          Create your first article to
          get started.
        </p>

      </div>
    );
  }

  return (
    <>
      <BulkActions
        selectedCount={selectedIds.length}
        onPublish={() =>
          executeBulk("publish")
        }
        onArchive={() =>
          executeBulk("archive")
        }
        onFeature={() =>
          executeBulk("feature")
        }
        onBreaking={() =>
          executeBulk("breaking")
        }
        onDelete={() =>
          executeBulk("delete")
        }
        onClear={() =>
          setSelectedIds([])
        }
      />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              News Articles
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {news.length} article
              {news.length !== 1 && "s"}
            </p>

          </div>

          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {selectedIds.length} Selected
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="w-14 px-6 py-4">

                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-slate-300"
                  />

                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  News
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Reporter
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Views
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Published
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">

                            {news.map((article) => (
                <NewsRow
                  key={article.id}
                  article={article}
                  selected={selectedIds.includes(article.id)}
                  onToggle={() => toggleRow(article.id)}
                  onDelete={() =>
                    confirmDelete(
                      article.id,
                      article.title
                    )
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteDialog
        open={!!deleteId}
        title={deleteTitle}
        loading={isPending}
        onCancel={() => {
          setDeleteId(null);
          setDeleteTitle("");
        }}
        onConfirm={performDelete}
      />
    </>
  );
}