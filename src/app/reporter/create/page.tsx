"use client";

import ReporterNewsForm from "@/components/Reporter/ReporterNewsForm";

export default function CreateNewsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ReporterNewsForm
          mode="create"
          apiEndpoint="/api/reporter/post/create"
          redirectTo="/reporter/news"
        />
      </div>
    </div>
  );
}