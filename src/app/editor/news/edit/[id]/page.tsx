import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import NewsForm from "@/components/news/NewsForm";
import { updateNewsAction } from "@/actions/news/update-news";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditNewsPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (
    session.user.role !== "EDITOR" &&
    session.user.role !== "ADMIN"
  ) {
    redirect("/");
  }

  // 1. Extract and await route params
  const { id } = await params;

  // 2. Query article using the extracted id
  const news = await prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
      author: true,
      assignedReporter: true,
      assignedEditor: true,
      tags: true,
    },
  });

  if (!news) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const reporters = await prisma.reporter.findMany({
    where: {
      status: "APPROVED",
      active: true,
    },
    orderBy: {
      firstName: "asc",
    },
  });

  async function saveNews(values: any) {
    "use server";

    await updateNewsAction({
      id,
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt,
      content: values.content,
      categoryId: values.categoryId,
      assignedReporterId: values.reporterId,
      image: values.featuredImage,
      video: values.videoUrl,
      featured: values.featured,
      breaking: values.breaking,
      trending: values.trending,
      seoTitle: values.seoTitle,
      seoDescription: values.seoDescription,
      seoKeywords: values.keywords,
      canonicalUrl: values.canonicalUrl,
      status: values.status,
      tags: values.tags,
    });
  }

  return (
    <NewsForm
      role={
        session.user.role as
          | "ADMIN"
          | "EDITOR"
      }
      mode="edit"
      categories={categories}
      reporters={reporters as any}
      initialValues={{
        title: news.title,
        slug: news.slug,
        excerpt: news.excerpt ?? "",
        content: news.content,
        categoryId: news.categoryId ?? "",
        reporterId: news.assignedReporterId ?? "",
        featuredImage: news.image ?? "",
        videoUrl: news.video ?? "",
        featured: news.featured,
        breaking: news.breaking,
        trending: news.trending,
        seoTitle: news.seoTitle ?? "",
        seoDescription: news.seoDescription ?? "",
        keywords: news.seoKeywords ?? "",
        canonicalUrl: news.canonicalUrl ?? "",
        status: news.status,
        tags: (news.tags ?? []).map((tag) => tag.name),
        gallery: [],
      }}
      onSubmit={saveNews}
    />
  );
}