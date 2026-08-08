"use client";

import { Plus, Edit, Trash2, Folder } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  status?: string;
  _count?: {
    posts: number;
  };
}

interface CategoriesClientProps {
  categories: Category[];
}

export default function CategoriesClient({ categories }: CategoriesClientProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">All Categories</h2>
          <p className="text-sm text-gray-500">Manage and organize your news categories</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Articles Count</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2">
                    <Folder size={16} className="text-blue-500" />
                    {cat.name}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{cat.slug}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                      {cat._count?.posts ?? 0} articles
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-400 hover:text-blue-600 transition">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}