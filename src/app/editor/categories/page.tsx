import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Plus,
  Pencil,
  FolderTree,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories =
    await prisma.category.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Categories
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage news categories and their
            organization.
          </p>
        </div>

        <Link
          href="/editor/categories/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <Plus size={18} />
          New Category
        </Link>

      </div>

      {/* Summary */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <FolderTree size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Categories
              </p>

              <p className="text-3xl font-black text-slate-900">
                {categories.length}
              </p>
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Active Categories
          </p>

          <p className="mt-2 text-3xl font-black text-emerald-600">
            {
              categories.filter(
                (category) =>
                  category.active
              ).length
            }
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Inactive Categories
          </p>

          <p className="mt-2 text-3xl font-black text-slate-500">
            {
              categories.filter(
                (category) =>
                  !category.active
              ).length
            }
          </p>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Slug
                </th>

                <th className="px-6 py-4">
                  Description
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Order
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {categories.length === 0 ? (

                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-sm text-slate-500"
                  >
                    No categories found.
                  </td>
                </tr>

              ) : (

                categories.map(
                  (category) => (
                    <tr
                      key={category.id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          {category.icon ? (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                              {category.icon}
                            </div>
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                              <FolderTree
                                size={18}
                              />
                            </div>
                          )}

                          <div>

                            <p className="font-semibold text-slate-900">
                              {category.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              {category.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {category.slug}
                      </td>

                      <td className="max-w-xs px-6 py-4 text-sm text-slate-500">
                        {category.description ||
                          "—"}
                      </td>

                      <td className="px-6 py-4 text-center">

                        {category.active ? (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Active
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            Inactive
                          </span>
                        )}

                      </td>

                      <td className="px-6 py-4 text-center text-sm font-medium text-slate-700">
                        {category.sortOrder}
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end">

                          <Link
                            href={`/editor/categories/${category.id}/edit`}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                          >
                            <Pencil
                              size={15}
                            />
                            Edit
                          </Link>

                        </div>

                      </td>

                    </tr>
                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}