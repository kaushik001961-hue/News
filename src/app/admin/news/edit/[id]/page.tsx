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

export default async function EditAdminNewsPage({ params }: PageProps) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const news = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      tags: true,
    },
  });

  if (!news) {
    notFound();
  }

  // Assign id to a const so TypeScript knows it is strictly non-null inside saveNews
  const newsId = news.id;

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
      id: newsId,

      title: values.title,
      slug: values.slug,

      excerpt: values.excerpt,
      content: values.content,

      categoryId: values.categoryId,
      assignedReporterId: values.reporterId,

      featuredImage: values.featuredImage,
      videoUrl: values.videoUrl,

      featured: values.featured,
      breaking: values.breaking,
      trending: values.trending,

      seoTitle: values.seoTitle,
      seoDescription: values.seoDescription,
      keywords: values.keywords,
      canonicalUrl: values.canonicalUrl,

      status: values.status,
    } as any);
  }

  return (
    <NewsForm
      role="ADMIN"
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

        tags: news.tags.map((tag) => tag.name),

        gallery: [],
      }}
      onSubmit={saveNews}
    />
  );
}