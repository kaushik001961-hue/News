import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReporterNewsForm from "@/components/Reporter/ReporterNewsForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditReporterNewsPage({
  params,
}: Props) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
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

  // Only draft and rejected articles can be edited
  if (
    post.status !== "DRAFT" &&
    post.status !== "REJECTED"
  ) {
    redirect(`/reporter/news/${post.id}`);
  }

  const initialData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    categoryId: post.categoryId,
    tags: [], // Replace with your actual tags relation if available
  };

  return (
    <div className="space-y-6">

      <div>

        <Link
          href={`/reporter/news/${post.id}`}
          className="mb-4 inline-flex items-center gap-2 text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Article
        </Link>

        <h1 className="text-3xl font-bold">
          Edit Article
        </h1>

        <p className="mt-2 text-slate-500">
          Update your article and submit it again for review.
        </p>

      </div>

      <ReporterNewsForm
        mode="edit"
        initialData={initialData}
      />

    </div>
  );
}