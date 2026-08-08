"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export interface CreateNewsInput {
  title: string;
  slug: string;

  excerpt?: string;
  content: string;

  categoryId?: string;
  reporterId?: string;

  featuredImage?: string;
  videoUrl?: string;

  featured: boolean;
  breaking: boolean;
  trending: boolean;

  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  canonicalUrl?: string;

  status: string;
}

export async function createNews(
  values: CreateNewsInput
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const role = session.user.role;

  const data: any = {
    title: values.title,
    slug: values.slug,

    excerpt: values.excerpt,
    content: values.content,

    image: values.featuredImage || null,
    video: values.videoUrl || null,

    categoryId:
      values.categoryId || null,

    featured: values.featured,
    breaking: values.breaking,
    trending: values.trending,

    seoTitle: values.seoTitle,
    seoDescription:
      values.seoDescription,
    seoKeywords: values.keywords,
    canonicalUrl:
      values.canonicalUrl,

    authorId: session.user.id,
  };

  switch (role) {
    case "REPORTER":
      data.status = "PENDING";
      data.assignedReporterId =
        session.user.id;
      data.submittedAt = new Date();
      break;

    case "EDITOR":
      data.status = values.status;
      data.assignedEditorId =
        session.user.id;

      if (values.reporterId) {
        data.assignedReporterId =
          values.reporterId;
      }

      break;

    case "ADMIN":
      data.status = values.status;

      if (values.reporterId) {
        data.assignedReporterId =
          values.reporterId;
      }

      break;

    default:
      throw new Error("Invalid role");
  }

  await prisma.post.create({
    data,
  });

  revalidatePath("/");

  switch (role) {
    case "ADMIN":
      redirect("/admin/news");

    case "EDITOR":
      redirect("/editor/news");

    case "REPORTER":
      redirect("/reporter/news");
  }
}