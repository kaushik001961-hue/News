"use client";

import { useTransition } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { deleteCategory } from "@/actions/category/delete-category";

interface Category {
  id: string;
  name: string;
}

interface DeleteCategoryDialogProps {
  open: boolean;
  category: Category | null;
  onClose: () => void;
}

export default function DeleteCategoryDialog({
  open,
  category,
  onClose,
}: DeleteCategoryDialogProps) {
  const [isPending, startTransition] = useTransition();

  if (!open || !category) return null;

  function handleDelete() {
    if (!category) return;

    startTransition(async () => {
      try {
        const result = await deleteCategory(category.id);
        console.log(result.message);
        onClose();
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Unable to delete category."
        );
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-red-100 p-3 text-red-600">
              <AlertTriangle size={28} />
            </div>

            <div>
              <h2 className="text-xl font-bold">Delete Category</h2>
              <p className="text-sm text-slate-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold">"{category.name}"</span>?
          </p>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">
              Deleting this category may affect articles that are currently
              assigned to it.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
          <button
            onClick={onClose}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={18} />
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 size={18} />
            {isPending ? "Deleting..." : "Delete Category"}
          </button>
        </div>
      </div>
    </div>
  );
}