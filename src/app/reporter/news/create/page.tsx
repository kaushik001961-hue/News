import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ReporterNewsForm from "@/components/Reporter/ReporterNewsForm";

export default function CreateReporterNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/reporter/news"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to My News
          </Link>

          <h1 className="text-3xl font-bold">
            Create News
          </h1>

          <p className="mt-2 text-slate-500">
            Write and submit a new article for editorial review.
          </p>
        </div>
      </div>

      <ReporterNewsForm mode="create" />
    </div>
  );
}