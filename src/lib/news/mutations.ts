import { prisma } from "@/lib/prisma";
import { Prisma, PostStatus } from "@prisma/client";

/* ======================================================
   Base Interface
====================================================== */

export interface NewsBaseInput {
  title: string;
  slug: string;
  content: string;

  excerpt?: string;

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
}

/* ======================================================
   Create Interface
====================================================== */

export interface CreateNewsInput extends NewsBaseInput {
  authorId: string;
}

/* ======================================================
   Update Interface
====================================================== */

export interface UpdateNewsInput extends NewsBaseInput {
  id: string;

  authorId: string;

  approvedById?: string;

  reviewedById?: string;

  reviewedAt?: Date | null;

  submittedAt?: Date | null;
}

/* ======================================================
   CREATE NEWS
====================================================== */

export async function createNews(data: CreateNewsInput) {
  return prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,

      excerpt: data.excerpt,

      image: data.image,
      video: data.video,

      categoryId: data.categoryId,

      stateId: data.stateId,
      districtId: data.districtId,
      talukaId: data.talukaId,
      village: data.village,

      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      seoKeywords: data.seoKeywords,
      canonicalUrl: data.canonicalUrl,
      focusKeyword: data.focusKeyword,

      featured: data.featured ?? false,

      breaking: data.breaking ?? false,

      trending: data.trending ?? false,

      hero: data.hero ?? false,

      editorsPick: data.editorsPick ?? false,

      assignedReporterId: data.assignedReporterId,

      assignedEditorId: data.assignedEditorId,

      authorId: data.authorId,

      status: data.status ?? "DRAFT",

      submittedAt: data.status === "PENDING" ? new Date() : null,
    },
  });
}

/* ======================================================
   UPDATE NEWS
====================================================== */

export async function updateNews(data: UpdateNewsInput) {
  return prisma.post.update({
    where: {
      id: data.id,
    },

    data: {
      title: data.title,
      slug: data.slug,

      content: data.content,
      excerpt: data.excerpt,

      image: data.image,
      video: data.video,

      categoryId: data.categoryId,

      stateId: data.stateId,
      districtId: data.districtId,
      talukaId: data.talukaId,
      village: data.village,

      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      seoKeywords: data.seoKeywords,
      canonicalUrl: data.canonicalUrl,
      focusKeyword: data.focusKeyword,

      featured: data.featured,
      breaking: data.breaking,
      trending: data.trending,
      hero: data.hero,
      editorsPick: data.editorsPick,

      status: data.status,

      assignedReporterId: data.assignedReporterId,

      assignedEditorId: data.assignedEditorId,

      approvedById: data.approvedById,

      reviewedById: data.reviewedById,

      reviewedAt: data.reviewedAt,

      submittedAt: data.submittedAt,
    },
  });
}

/* ======================================================
   DELETE NEWS
====================================================== */

export async function deleteNews(id: string) {
  return prisma.post.delete({
    where: {
      id,
    },
  });
}

/* ======================================================
   PUBLISH NEWS
====================================================== */

export async function publishNews(id: string, approvedById: string) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      status: "PUBLISHED",

      approvedById,

      publishedAt: new Date(),
    },
  });
}

/* ======================================================
   APPROVE NEWS
====================================================== */

export async function approveNews(
  id: string,
  editorId: string
) {
  return prisma.post.update({
    where: { id },
    data: {
      status: "APPROVED", // ✅ Editor only approves

      reviewedById: editorId,

      reviewedAt: new Date(),
    },
  });
}
/* ======================================================
   REJECT NEWS
====================================================== */

export async function rejectNews(
  id: string,
  reviewedById: string,
  reason?: string
) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      status: "REJECTED",

      reviewedById,

      reviewedAt: new Date(),

      rejectReason: reason,
    },
  });
}

/* ======================================================
   ARCHIVE NEWS
====================================================== */

export async function archiveNews(id: string) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      status: "ARCHIVED",
    },
  });
}

/* ======================================================
   RESTORE NEWS
====================================================== */

export async function restoreNews(id: string) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      status: "DRAFT",

      reviewedById: null,
      reviewedAt: null,

      rejectReason: null,
    },
  });
}

/* ======================================================
   ASSIGN REPORTER
====================================================== */

export async function assignReporter(id: string, reporterId: string) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      assignedReporterId: reporterId,
    },
  });
}

/* ======================================================
   ASSIGN EDITOR
====================================================== */

export async function assignEditor(id: string, editorId: string) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      assignedEditorId: editorId,
    },
  });
}

/* ======================================================
   DUPLICATE NEWS
====================================================== */

export async function duplicateNews(
  id: string
) {
  const article = await prisma.post.findUnique({
    where: {
      id,
    },

    include: {
      tags: true,
    },
  });

  if (!article) {
    throw new Error("Article not found.");
  }

  return prisma.post.create({
    data: {
      title: `${article.title} (Copy)`,

      slug: `${article.slug}-${Date.now()}`,

      content: article.content,

      excerpt: article.excerpt,

      image: article.image,
      video: article.video,

      categoryId: article.categoryId,

      stateId: article.stateId,
      districtId: article.districtId,
      talukaId: article.talukaId,
      village: article.village,

      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
      seoKeywords: article.seoKeywords,
      canonicalUrl: article.canonicalUrl,
      focusKeyword: article.focusKeyword,

      featured: false,
      breaking: false,
      trending: false,
      hero: false,
      editorsPick: false,

      status: "DRAFT",

      authorId: article.authorId,

      assignedReporterId:
        article.assignedReporterId,

      assignedEditorId:
        article.assignedEditorId,

      tags: {
        connect: article.tags.map((tag) => ({
          id: tag.id,
        })),
      },
    },

    include: {
      tags: true,
      category: true,
    },
  });
}

/* ======================================================
   BULK STATUS UPDATE
====================================================== */

export async function bulkUpdateStatus(ids: string[], status: PostStatus) {
  return prisma.post.updateMany({
    where: {
      id: {
        in: ids,
      },
    },

    data: {
      status,
    },
  });
}

/* ======================================================
   BULK FEATURE
====================================================== */

export async function bulkFeature(ids: string[], featured: boolean) {
  return prisma.post.updateMany({
    where: {
      id: {
        in: ids,
      },
    },

    data: {
      featured,
    },
  });
}

/* ======================================================
   BULK BREAKING
====================================================== */

export async function bulkBreaking(ids: string[], breaking: boolean) {
  return prisma.post.updateMany({
    where: {
      id: {
        in: ids,
      },
    },

    data: {
      breaking,
    },
  });
}

/* ======================================================
   BULK TRENDING
====================================================== */

export async function bulkTrending(ids: string[], trending: boolean) {
  return prisma.post.updateMany({
    where: {
      id: {
        in: ids,
      },
    },

    data: {
      trending,
    },
  });
}

/* ======================================================
   BULK HERO
====================================================== */

export async function bulkHero(ids: string[], hero: boolean) {
  return prisma.post.updateMany({
    where: {
      id: {
        in: ids,
      },
    },

    data: {
      hero,
    },
  });
}

/* ======================================================
   BULK EDITOR'S PICK
====================================================== */

export async function bulkEditorsPick(ids: string[], editorsPick: boolean) {
  return prisma.post.updateMany({
    where: {
      id: {
        in: ids,
      },
    },

    data: {
      editorsPick,
    },
  });
}

/* ======================================================
   BULK DELETE
====================================================== */

export async function bulkDelete(ids: string[]) {
  return prisma.post.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}