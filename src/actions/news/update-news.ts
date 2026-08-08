"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { updateNews } from "@/lib/news/mutations";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { PostStatus } from "@prisma/client";


export interface UpdateNewsInput {
  id: string;

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

export async function updateNewsAction(
  values: UpdateNewsInput
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const role = session.user.role;

  const existing =
    await prisma.post.findUnique({
      where: {
        id: values.id,
      },

      include: {
        tags: true,
      },
    });

  if (!existing) {
    throw new Error("News not found.");
  }

  /*
  =====================================
  Reporter can edit only own news
  =====================================
  */

  if (
    role === "REPORTER" &&
    existing.authorId !==
      session.user.id
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  /*
  =====================================
  Create / Find Tags
  =====================================
  */

  const tagIds: { id: string }[] = [];

  if (values.tags?.length) {
    for (const tagName of values.tags) {
      const slug = tagName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

      let tag =
        await prisma.tag.findUnique({
          where: {
            slug,
          },
        });

      if (!tag) {
        tag =
          await prisma.tag.create({
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
  =====================================
  Workflow
  =====================================
  */

  let status =
    values.status ?? "DRAFT";

  let submittedAt:
    | Date
    | null = null;

  let reviewedAt:
    | Date
    | null = null;

  let reviewedById:
    | string
    | undefined;

  let approvedById:
    | string
    | undefined;

  let publishedAt:
    | Date
    | null = null;

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
      reviewedById =
        session.user.id;

      reviewedAt = new Date();

      assignedEditorId =
        session.user.id;

      if (
        status === "PUBLISHED"
      ) {
        publishedAt =
          new Date();
      }

      break;

    case "ADMIN":
      approvedById =
        session.user.id;

      if (
        status === "PUBLISHED"
      ) {
        publishedAt =
          new Date();
      }

      break;
  }  /*
  =====================================
  Update News
  =====================================
  */

  await updateNews({
    id: values.id,

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

    status,

    assignedReporterId,
    assignedEditorId,

    approvedById,
    reviewedById,

    reviewedAt,
    submittedAt,

    authorId: existing.authorId,
  });

  /*
  =====================================
  Update Tags
  =====================================
  */

  await prisma.post.update({
    where: {
      id: values.id,
    },

    data: {
      tags: {
        set: [],

        connect: tagIds,
      },
    },
  });

  /*
  =====================================
  Workflow Fields
  =====================================
  */

  await prisma.post.update({
    where: {
      id: values.id,
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
  =====================================
  Revalidate
  =====================================
  */

  revalidatePath("/");

  revalidatePath("/admin/news");
  revalidatePath("/editor/news");
  revalidatePath("/reporter/news");

  /*
  =====================================
  Redirect
  =====================================
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