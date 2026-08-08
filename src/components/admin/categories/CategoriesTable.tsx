"use client";

import { useState } from "react";

import CategoryRow from "./CategoryRow";
import BulkCategoryActions from "./BulkCategoryActions";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;

  active: boolean;

  color?: string | null;

  parent?: {
    id: string;
    name: string;
  } | null;

  _count: {
    posts: number;
  };
}

interface CategoriesTableProps {
  categories: CategoryItem[];
}

export default function CategoriesTable({
  categories,
}: CategoriesTableProps) {
  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const [deleteCategory, setDeleteCategory] =
    useState<CategoryItem | null>(null);

  const allSelected =
    categories.length > 0 &&
    selectedIds.length === categories.length;

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

    setSelectedIds(
      categories.map((c) => c.id)
    );
  }

  return (
    <>
      <BulkCategoryActions
  selectedIds={selectedIds}
  clearSelection={() => setSelectedIds([])}
  onDelete={async (ids) => {
    console.log("Delete:", ids);
    // TODO: Call bulkDeleteCategories(ids)
  }}
  onActivate={async (ids) => {
    console.log("Activate:", ids);
    // TODO: Call bulkActivateCategories(ids)
  }}
  onDeactivate={async (ids) => {
    console.log("Deactivate:", ids);
    // TODO: Call bulkDeactivateCategories(ids)
  }}
  onExport={async (ids) => {
    console.log("Export:", ids);
    // TODO: Call exportCategories(ids)
  }}
/>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Categories
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {categories.length} categories
              </p>

            </div>

            <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

              {selectedIds.length} Selected

            </div>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="w-14 px-6 py-4">

                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                  />

                </th>

                <th className="px-6 py-4 text-left">
                  Category
                </th>

                <th className="px-6 py-4 text-left">
                  Parent
                </th>

                <th className="px-6 py-4 text-left">
                  Articles
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {categories.map((category) => (

                <CategoryRow
                  key={category.id}
                  category={category}
                  selected={selectedIds.includes(
                    category.id
                  )}
                  onToggle={() =>
                    toggleRow(category.id)
                  }
                  onDelete={() =>
                    setDeleteCategory(category)
                  }
                />

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <DeleteCategoryDialog
        category={deleteCategory}
        open={!!deleteCategory}
        onClose={() =>
          setDeleteCategory(null)
        }
      />
    </>
  );
}