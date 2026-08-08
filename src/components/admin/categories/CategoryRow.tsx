"use client";

import Link from "next/link";

import {
  Pencil,
  Trash2,
  FolderTree,
  FileText,
} from "lucide-react";

import { CategoryItem } from "./CategoriesTable";

interface CategoryRowProps {
  category: CategoryItem;
  selected: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function CategoryRow({
  category,
  selected,
  onToggle,
  onDelete,
}: CategoryRowProps) {
  return (
    <tr className="transition hover:bg-slate-50">

      {/* Checkbox */}

      <td className="px-6 py-4">

        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="h-4 w-4 rounded border-slate-300"
        />

      </td>

      {/* Category */}

      <td className="px-6 py-4">

        <div className="flex items-center gap-4">

          <div
            className="h-12 w-12 rounded-2xl flex items-center justify-center text-white"
            style={{
              backgroundColor:
                category.color || "#2563eb",
            }}
          >
            <FolderTree size={22} />
          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              {category.name}
            </h3>

            <p className="text-sm text-slate-500">
              {category.slug}
            </p>

          </div>

        </div>

      </td>

      {/* Parent */}

      <td className="px-6 py-4">

        {category.parent ? (

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">

            {category.parent.name}

          </span>

        ) : (

          <span className="text-slate-400">
            —
          </span>

        )}

      </td>

      {/* Articles */}

      <td className="px-6 py-4">

        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

          <FileText size={15} />

          {category._count.posts}

        </div>

      </td>

      {/* Status */}

      <td className="px-6 py-4">

        {category.active ? (

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

            Active

          </span>

        ) : (

          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

            Inactive

          </span>

        )}

      </td>

      {/* Actions */}

      <td className="px-6 py-4">

        <div className="flex justify-end gap-3">

          <Link
            href={`/admin/categories/edit/${category.id}`}
            className="rounded-xl border border-blue-200 p-2 text-blue-600 transition hover:bg-blue-50"
            title="Edit Category"
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={onDelete}
            className="rounded-xl border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
            title="Delete Category"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}