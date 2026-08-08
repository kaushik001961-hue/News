import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  ArrowLeft,
  Pencil,
  Calendar,
  Eye,
  User,
  Clock,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PreviewNewsPage({
  params,
}: PageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const news = await prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
      author: true,
      assignedReporter: true,
      assignedEditor: true,
    },
  });

  if (!news) {
    notFound();
  }

  // Reporter fallback name logic safely handling different schema models
  const reporter = news.assignedReporter as any;
  const legacyReporter = (news as any).reporter;

  const reporterName = reporter
    ? reporter.firstName
      ? `${reporter.firstName} ${reporter.lastName ?? ""}`
      : reporter.name || "Assigned Reporter"
    : legacyReporter
    ? `${legacyReporter.firstName} ${legacyReporter.lastName ?? ""}`
    : news.author?.name || "Anonymous";

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/editor/news"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <Link
          href={`/editor/news/edit/${news.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          <Pencil size={18} />
          Edit News
        </Link>
      </div>

      {/* Hero Image */}
      <div className="overflow-hidden rounded-3xl">
        <Image
          src={
            news.image ||
            (news as any).featuredImage ||
            "/images/news-placeholder.jpg"
          }
          alt={news.title}
          width={1400}
          height={700}
          className="h-[450px] w-full object-cover"
        />
      </div>

      {/* Category */}
      {news.category?.name && (
        <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {news.category.name}
        </span>
      )}

      {/* Title */}
      <h1 className="text-5xl font-black leading-tight text-slate-900">
        {news.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap gap-6 text-slate-500">
        <div className="flex items-center gap-2">
          <User size={18} />
          {reporterName}
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={18} />
          {news.createdAt.toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2">
          <Eye size={18} />
          {(news.views ?? 0).toLocaleString()} Views
        </div>

        <div className="flex items-center gap-2">
          <Clock size={18} />
          5 min read
        </div>
      </div>

      {/* Excerpt */}
      {news.excerpt && (
        <div className="rounded-2xl bg-slate-100 p-6 text-lg italic text-slate-700">
          {news.excerpt}
        </div>
      )}

      {/* Content */}
      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: news.content,
        }}
      />

      {/* SEO */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">SEO Preview</h2>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-blue-700">
            {news.seoTitle || news.title}
          </p>

          <p className="text-sm text-green-700">
            https://agsnews.com/news/{news.slug}
          </p>

          <p className="text-slate-600">
            {news.seoDescription || news.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
}