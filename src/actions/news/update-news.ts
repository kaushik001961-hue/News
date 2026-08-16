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
  /* =====================================================
     AUTHENTICATION
  ===================================================== */

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const role = session.user.role;

  if (
    role !== "ADMIN" &&
    role !== "EDITOR" &&
    role !== "REPORTER"
  ) {
    throw new Error("Unauthorized");
  }

  /* =====================================================
     GET EXISTING NEWS
  ===================================================== */

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

  /* =====================================================
     REPORTER PERMISSION
     
     Reporter can edit ONLY their own News.
     
     IMPORTANT:
     assignedReporterId is not used here for ownership.
     
     Ownership is based on authorId.
  ===================================================== */

  if (
    role === "REPORTER" &&
    existing.authorId !== session.user.id
  ) {
    throw new Error(
      "You can only edit your own News."
    );
  }

  /* =====================================================
     CREATE / FIND TAGS
  ===================================================== */

  const tagIds: { id: string }[] = [];

  if (values.tags?.length) {
    for (const tagName of values.tags) {
      const cleanTag =
        tagName.trim();

      if (!cleanTag) {
        continue;
      }

      const slug = cleanTag
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(
          /[^a-z0-9-]/g,
          ""
        );

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
              name: cleanTag,
              slug,
            },
          });
      }

      tagIds.push({
        id: tag.id,
      });
    }
  }

  /* =====================================================
     WORKFLOW VARIABLES
  ===================================================== */

  let status: PostStatus;

  let submittedAt:
    | Date
    | null = existing.submittedAt;

  let reviewedAt:
    | Date
    | null = existing.reviewedAt;

  let reviewedById:
    | string
    | null = existing.reviewedById;

  let approvedById:
    | string
    | null = existing.approvedById;

  let publishedAt:
    | Date
    | null = existing.publishedAt;

  let assignedEditorId:
    | string
    | null =
      existing.assignedEditorId;

  let assignedReporterId:
    | string
    | null =
      existing.assignedReporterId;

  /* =====================================================
     REPORTER
     
     REPORTER CANNOT:
     
     ❌ Publish
     ❌ Approve
     ❌ Reject
     ❌ Review
     ❌ Assign Editor
     ❌ Change workflow status
     
     Reporter submission ALWAYS becomes PENDING.
  ===================================================== */

  if (role === "REPORTER") {
    status = "PENDING";

    submittedAt = new Date();

    /*
     * Reporter cannot modify these fields.
     */

    reviewedAt =
      existing.reviewedAt;

    reviewedById =
      existing.reviewedById;

    approvedById =
      existing.approvedById;

    publishedAt =
      existing.publishedAt;

    assignedEditorId =
      existing.assignedEditorId;

    /*
     * Reporter remains the author.
     *
     * Do not allow the Reporter to assign
     * the News to another Reporter.
     */
    assignedReporterId =
      existing.assignedReporterId;
  }

  /* =====================================================
     EDITOR
     
     Editor can review and publish.
  ===================================================== */

  else if (role === "EDITOR") {
    status =
      values.status ??
      existing.status;

    reviewedById =
      session.user.id;

    reviewedAt =
      new Date();

    /*
     * Editor becomes assigned editor.
     */
    assignedEditorId =
      session.user.id;

    /*
     * Editor can publish.
     */
    if (
      status === "PUBLISHED"
    ) {
      publishedAt =
        existing.publishedAt ??
        new Date();
    }

    /*
     * If Editor moves News away from
     * PUBLISHED, clear publication date.
     */
    if (
      status !== "PUBLISHED"
    ) {
      publishedAt = null;
    }

    /*
     * Preserve existing Reporter unless
     * a valid value was explicitly supplied.
     */
    assignedReporterId =
      values.assignedReporterId?.trim() ||
      existing.assignedReporterId ||
      null;
  }

  /* =====================================================
     ADMIN
     
     Admin has full workflow permission.
  ===================================================== */

  else {
    status =
      values.status ??
      existing.status;

    approvedById =
      session.user.id;

    /*
     * Admin may publish.
     */
    if (
      status === "PUBLISHED"
    ) {
      publishedAt =
        existing.publishedAt ??
        new Date();
    }

    /*
     * If Admin changes the News away
     * from PUBLISHED, clear publishedAt.
     */
    if (
      status !== "PUBLISHED"
    ) {
      publishedAt = null;
    }

    /*
     * Preserve / update assignments.
     */
    assignedEditorId =
      values.assignedEditorId?.trim() ||
      existing.assignedEditorId ||
      null;

    assignedReporterId =
      values.assignedReporterId?.trim() ||
      existing.assignedReporterId ||
      null;
  }

  /* =====================================================
     SAFETY CHECK
     
     Reporter MUST NEVER publish.
     
     This is intentionally duplicated as a final
     server-side protection.
  ===================================================== */

  if (
    role === "REPORTER" &&
    status === "PUBLISHED"
  ) {
    throw new Error(
      "Reporters are not allowed to publish News."
    );
  }

  /* =====================================================
     UPDATE NEWS
  ===================================================== */

  await updateNews({
    id: values.id,

    title:
      values.title,

    slug:
      values.slug,

    excerpt:
      values.excerpt,

    content:
      values.content,

    image:
      values.image,

    video:
      values.video,

    categoryId:
      values.categoryId,

    stateId:
      values.stateId,

    districtId:
      values.districtId,

    talukaId:
      values.talukaId,

    village:
      values.village,

    seoTitle:
      values.seoTitle,

    seoDescription:
      values.seoDescription,

    seoKeywords:
      values.seoKeywords,

    canonicalUrl:
      values.canonicalUrl,

    focusKeyword:
      values.focusKeyword,

    featured:
      values.featured ?? false,

    breaking:
      values.breaking ?? false,

    trending:
      values.trending ?? false,

    hero:
      values.hero ?? false,

    editorsPick:
      values.editorsPick ?? false,

    status,

    assignedReporterId:
      assignedReporterId ?? undefined,

    assignedEditorId:
      assignedEditorId ?? undefined,

    approvedById:
      approvedById ?? undefined,

    reviewedById:
      reviewedById ?? undefined,

    reviewedAt,

    submittedAt,

    authorId:
      existing.authorId,
  });

  /* =====================================================
     UPDATE TAGS
  ===================================================== */

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

  /* =====================================================
     WORKFLOW FIELDS
  ===================================================== */

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

  /* =====================================================
     REVALIDATE
  ===================================================== */

  revalidatePath("/");

  revalidatePath("/admin/news");

  revalidatePath("/editor/news");

  revalidatePath("/reporter/news");

  /* =====================================================
     REDIRECT
  ===================================================== */

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