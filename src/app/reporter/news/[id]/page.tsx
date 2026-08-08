import Link from "next/link";
import { notFound } from "next/navigation";
import { Eye, Pencil, ArrowLeft } from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReporterNewsDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    notFound();
  }

  const post = await prisma.post.findFirst({
    where: {
      id,
      authorId: session.user.id,
    },
    include: {
      category: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <Link
            href="/reporter/news"
            className="mb-4 inline-flex items-center gap-2 text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to My News
          </Link>

          <h1 className="text-3xl font-bold">
            {post.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {post.category?.name ?? "Uncategorized"}
          </p>

        </div>

        {(post.status === "DRAFT" ||
          post.status === "REJECTED") && (
          <Link
            href={`/reporter/news/${post.id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit
          </Link>
        )}

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <InfoCard
          title="Status"
          value={post.status}
        />

        <InfoCard
          title="Views"
          value={String(post.views)}
        />

        <InfoCard
          title="Created"
          value={new Date(
            post.createdAt
          ).toLocaleDateString()}
        />

        <InfoCard
          title="Published"
          value={
            post.publishedAt
              ? new Date(
                  post.publishedAt
                ).toLocaleDateString()
              : "-"
          }
        />

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-4 text-2xl font-bold">
          Summary
        </h2>

        <p className="leading-8 text-slate-700">
          {post.excerpt}
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-2">

          <Eye size={20} />

          <h2 className="text-2xl font-bold">
            Full Article
          </h2>

        </div>

        <article className="prose max-w-none whitespace-pre-wrap">
          {post.content}
        </article>

      </div>

    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-bold">
        {value}
      </h3>

    </div>
  );
}