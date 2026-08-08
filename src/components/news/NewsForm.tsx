"use client";

import { useState } from "react";

import NewsEditor, {
  NewsEditorValues,
} from "./NewsEditor";

interface Category {
  id: string;
  name: string;
}

interface Reporter {
  id: string;
  reporterId: string;
  firstName: string;
  lastName: string;
  designation?: string | null;
}

export type NewsRole =
  | "ADMIN"
  | "EDITOR"
  | "REPORTER";

interface NewsFormProps {
  role: NewsRole;

  mode: "create" | "edit";

  categories: Category[];

  reporters: Reporter[];

  initialValues?: Partial<NewsEditorValues>;

  onSubmit: (
    values: NewsEditorValues
  ) => Promise<void>;
}

export default function NewsForm({
  role,
  mode,
  categories,
  reporters,
  initialValues,
  onSubmit,
}: NewsFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: NewsEditorValues
  ) {
    setLoading(true);

    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">

        <h1 className="text-2xl font-bold text-slate-900">
          {mode === "create"
            ? "Create News"
            : "Edit News"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {mode === "create"
            ? "Create a new news article."
            : "Update your news article."}
        </p>

      </div>

      <NewsEditor
        categories={categories}
        reporters={reporters}
        initialValues={{
          status:
            role === "REPORTER"
              ? "PENDING"
              : initialValues?.status ?? "DRAFT",

          ...initialValues,
        }}
        onSubmit={handleSubmit}
      />

      {loading && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-sm text-blue-700">
          Saving news...
        </div>
      )}

    </div>
  );
}