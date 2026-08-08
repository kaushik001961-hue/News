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

export default async function EditReporterNewsPage({
  params,
}: PageProps) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "REPORTER") {
    redirect("/");
  }

  const news = await prisma.post.findFirst({
    where: {
      id,
      authorId: session.user.id,
    },
    include: {
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

  async function saveNews(values: any) {
    "use server";

    await updateNewsAction({
      id: id,

      title: values.title,
      slug: values.slug,

      excerpt: values.excerpt,
      content: values.content,

      categoryId: values.categoryId,

      featuredImage: values.featuredImage,
      videoUrl: values.videoUrl,

      featured: values.featured,
      breaking: values.breaking,
      trending: values.trending,

      seoTitle: values.seoTitle,
      seoDescription: values.seoDescription,
      keywords: values.keywords,
      canonicalUrl: values.canonicalUrl,

      // Safe optional access or type assertion for the closure
      status: (news as any)?.status,
    } as any);
  }

  return (
    <NewsForm
      role="REPORTER"
      mode="edit"
      categories={categories}
      reporters={[]} // Reporter cannot assign reporters
      initialValues={{
        title: news.title,
        slug: news.slug,

        excerpt: news.excerpt ?? "",
        content: news.content,

        categoryId: news.categoryId ?? "",

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