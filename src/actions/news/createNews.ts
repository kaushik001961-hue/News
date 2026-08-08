"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { createNews } from "@/lib/news/mutations";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { PostStatus } from "@prisma/client";

export interface CreateNewsInput {
  title: string;
  slug: string;

  excerpt?: string;
  content: string;

  image?: string;
  video?: string;

  categoryId?: string;

  stateId?: string;
  districtId?: string;
  talukaId?: string;
  village?: string;

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  focusKeyword?: string;

  featured?: boolean;
  breaking?: boolean;
  trending?: boolean;
  hero?: boolean;
  editorsPick?: boolean;

  assignedReporterId?: string;
  assignedEditorId?: string;

  status?: PostStatus;

  tags?: string[];
}

export async function createNewsAction(
  values: CreateNewsInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const role = session.user.role;

  /*
  =======================================
  Create / Find Tags
  =======================================
  */

  const tagIds: { id: string }[] = [];

  if (values.tags?.length) {
    for (const tagName of values.tags) {
      const slug = tagName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

      let tag = await prisma.tag.findUnique({
        where: {
          slug,
        },
      });

      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagName,
            slug,
          },
        });
      }

      tagIds.push({
        id: tag.id,
      });
    }
  }

  /*
  =======================================
  Workflow
  =======================================
  */

  let status: PostStatus =
    values.status ?? "DRAFT";

  let submittedAt: Date | null = null;

  let reviewedAt: Date | null = null;

  let reviewedById: string | undefined;

  let approvedById: string | undefined;

  let publishedAt: Date | null = null;

  let assignedEditorId =
    values.assignedEditorId;

  let assignedReporterId =
    values.assignedReporterId;

  switch (role) {
    case "REPORTER":
      status = "PENDING";
      submittedAt = new Date();
      break;

    case "EDITOR":
      reviewedById = session.user.id;
      reviewedAt = new Date();

      if (status === "PUBLISHED") {
        publishedAt = new Date();
      }

      assignedEditorId =
        session.user.id;

      break;

    case "ADMIN":
      approvedById =
        session.user.id;

      if (status === "PUBLISHED") {
        publishedAt = new Date();
      }

      break;
  }
    /*
  =======================================
  Create News
  =======================================
  */

  const post = await createNews({
    title: values.title,
    slug: values.slug,

    excerpt: values.excerpt,
    content: values.content,

    image: values.image,
    video: values.video,

    categoryId: values.categoryId,

    stateId: values.stateId,
    districtId: values.districtId,
    talukaId: values.talukaId,
    village: values.village,

    seoTitle: values.seoTitle,
    seoDescription: values.seoDescription,
    seoKeywords: values.seoKeywords,
    canonicalUrl: values.canonicalUrl,
    focusKeyword: values.focusKeyword,

    featured: values.featured ?? false,
    breaking: values.breaking ?? false,
    trending: values.trending ?? false,
    hero: values.hero ?? false,
    editorsPick: values.editorsPick ?? false,

    assignedReporterId,
    assignedEditorId,

    authorId: session.user.id,

    status,
  });

  /*
  =======================================
  Connect Tags
  =======================================
  */

  if (tagIds.length) {
    await prisma.post.update({
      where: {
        id: post.id,
      },

      data: {
        tags: {
          connect: tagIds,
        },
      },
    });
  }

  /*
  =======================================
  Workflow Fields
  =======================================
  */

  await prisma.post.update({
    where: {
      id: post.id,
    },

    data: {
      submittedAt,

      reviewedAt,

      reviewedById,

      approvedById,

      publishedAt,
    },
  });

  /*
  =======================================
  Revalidate
  =======================================
  */

  revalidatePath("/");

  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/reporter/news");

  /*
  =======================================
  Redirect
  =======================================
  */

  switch (role) {
    case "ADMIN":
      redirect("/admin/news");

    case "EDITOR":
      redirect("/editor/news");

    case "REPORTER":
      redirect("/reporter/news");

    default:
      redirect("/");
  }
}