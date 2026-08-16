import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

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

export interface CreateNewsInput
  extends NewsBaseInput {
  authorId: string;
}

/* ======================================================
   Update Interface
====================================================== */

export interface UpdateNewsInput
  extends NewsBaseInput {
  id: string;

  authorId: string;

  approvedById?: string;

  reviewedById?: string;

  reviewedAt?: Date | null;

  submittedAt?: Date | null;
}

/* ======================================================
   REPORTER RESOLVER
====================================================== */

/**
 * IMPORTANT DATABASE RELATION
 *
 * Post.assignedReporterId
 *        ↓
 * User.id
 *
 * Reporter.userId
 *        ↓
 * User.id
 *
 * Therefore:
 *
 * Reporter.id            ❌
 * Reporter.reporterId    ❌
 *
 * Reporter.userId        ✅
 *
 * The News editor may provide:
 *
 * 1. Reporter.id
 * 2. Reporter.reporterId
 * 3. Reporter.userId
 *
 * This function resolves all of them to
 * the actual User.id that Post requires.
 */

async function resolveReporterUserId(
  value?: string | null
): Promise<string | null> {
  /* --------------------------------------------------
     No reporter selected
  -------------------------------------------------- */

  if (!value) {
    return null;
  }

  const reporterValue =
    value.trim();

  if (!reporterValue) {
    return null;
  }

  /* --------------------------------------------------
     Find Reporter

     We support:

     Reporter.id
     Reporter.reporterId
     Reporter.userId
  -------------------------------------------------- */

  const reporter =
    await prisma.reporter.findFirst({
      where: {
        OR: [
          {
            id: reporterValue,
          },
          {
            reporterId:
              reporterValue,
          },
          {
            userId:
              reporterValue,
          },
        ],
      },

      select: {
        id: true,
        reporterId: true,
        userId: true,
        firstName: true,
        lastName: true,
      },
    });

  /* --------------------------------------------------
     Reporter not found
  -------------------------------------------------- */

  if (!reporter) {
    throw new Error(
      `Reporter "${reporterValue}" was not found.`
    );
  }

  /* --------------------------------------------------
     Reporter exists but has no User account
  -------------------------------------------------- */

  if (!reporter.userId) {
    const displayName =
      reporter.reporterId ||
      `${reporter.firstName} ${reporter.lastName}`.trim() ||
      reporter.id;

    throw new Error(
      `Reporter "${displayName}" is not linked to a user account. Please link this reporter to a user before assigning the News.`
    );
  }

  /* --------------------------------------------------
     IMPORTANT

     Post.assignedReporterId references
     User.id.

     Therefore return Reporter.userId,
     NOT Reporter.id.
  -------------------------------------------------- */

  return reporter.userId;
}

/* ======================================================
   CREATE NEWS
====================================================== */

export async function createNews(
  data: CreateNewsInput
) {
  const assignedReporterId =
    await resolveReporterUserId(
      data.assignedReporterId
    );

  return prisma.post.create({
    data: {
      title: data.title,

      slug: data.slug,

      content: data.content,

      excerpt: data.excerpt,

      image: data.image,

      video: data.video,

      categoryId:
        data.categoryId || null,

      stateId:
        data.stateId || null,

      districtId:
        data.districtId || null,

      talukaId:
        data.talukaId || null,

      village:
        data.village || null,

      seoTitle:
        data.seoTitle || null,

      seoDescription:
        data.seoDescription || null,

      seoKeywords:
        data.seoKeywords || null,

      canonicalUrl:
        data.canonicalUrl || null,

      focusKeyword:
        data.focusKeyword || null,

      featured:
        data.featured ?? false,

      breaking:
        data.breaking ?? false,

      trending:
        data.trending ?? false,

      hero:
        data.hero ?? false,

      editorsPick:
        data.editorsPick ?? false,

      assignedReporterId,

      assignedEditorId:
        data.assignedEditorId || null,

      authorId:
        data.authorId,

      status:
        data.status ?? "DRAFT",

      submittedAt:
        data.status === "PENDING"
          ? new Date()
          : null,
    },
  });
}

/* ======================================================
   UPDATE NEWS
====================================================== */

export async function updateNews(
  data: UpdateNewsInput
) {
  /*
   * Resolve the selected Reporter to
   * the associated User.id.
   */
  const assignedReporterId =
    await resolveReporterUserId(
      data.assignedReporterId
    );

  return prisma.post.update({
    where: {
      id: data.id,
    },

    data: {
      title:
        data.title,

      slug:
        data.slug,

      content:
        data.content,

      excerpt:
        data.excerpt,

      image:
        data.image,

      video:
        data.video,

      categoryId:
        data.categoryId || null,

      stateId:
        data.stateId || null,

      districtId:
        data.districtId || null,

      talukaId:
        data.talukaId || null,

      village:
        data.village || null,

      seoTitle:
        data.seoTitle || null,

      seoDescription:
        data.seoDescription || null,

      seoKeywords:
        data.seoKeywords || null,

      canonicalUrl:
        data.canonicalUrl || null,

      focusKeyword:
        data.focusKeyword || null,

      featured:
        data.featured ?? false,

      breaking:
        data.breaking ?? false,

      trending:
        data.trending ?? false,

      hero:
        data.hero ?? false,

      editorsPick:
        data.editorsPick ?? false,

      status:
        data.status,

      /*
       * IMPORTANT:
       *
       * This is User.id.
       *
       * NOT Reporter.id.
       */
      assignedReporterId,

      assignedEditorId:
        data.assignedEditorId || null,

      approvedById:
        data.approvedById || null,

      reviewedById:
        data.reviewedById || null,

      reviewedAt:
        data.reviewedAt ?? null,

      submittedAt:
        data.submittedAt ?? null,
    },
  });
}

/* ======================================================
   DELETE NEWS
====================================================== */

export async function deleteNews(
  id: string
) {
  return prisma.post.delete({
    where: {
      id,
    },
  });
}

/* ======================================================
   PUBLISH NEWS
====================================================== */

export async function publishNews(
  id: string,
  approvedById: string
) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      status: "PUBLISHED",

      approvedById,

      publishedAt:
        new Date(),
    },
  });
}

/* ======================================================
   APPROVE NEWS
====================================================== */

/* ======================================================
   APPROVE NEWS
====================================================== */

export async function approveNews(
  id: string,
  editorId: string
) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      status: "PUBLISHED",

      approvedById: editorId,

      reviewedById: editorId,

      reviewedAt: new Date(),

      publishedAt: new Date(),
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

      reviewedAt:
        new Date(),

      rejectReason:
        reason || null,
    },
  });
}

/* ======================================================
   ARCHIVE NEWS
====================================================== */

export async function archiveNews(
  id: string
) {
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

export async function restoreNews(
  id: string
) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      status: "DRAFT",

      reviewedById:
        null,

      reviewedAt:
        null,

      rejectReason:
        null,
    },
  });
}

/* ======================================================
   ASSIGN REPORTER
====================================================== */

export async function assignReporter(
  id: string,
  reporterId: string
) {
  /*
   * reporterId may actually be:
   *
   * Reporter.id
   * Reporter.reporterId
   * Reporter.userId
   *
   * Resolve it to User.id.
   */
  const assignedReporterId =
    await resolveReporterUserId(
      reporterId
    );

  return prisma.post.update({
    where: {
      id,
    },

    data: {
      assignedReporterId,
    },
  });
}

/* ======================================================
   ASSIGN EDITOR
====================================================== */

export async function assignEditor(
  id: string,
  editorId: string
) {
  return prisma.post.update({
    where: {
      id,
    },

    data: {
      assignedEditorId:
        editorId || null,
    },
  });
}

/* ======================================================
   DUPLICATE NEWS
====================================================== */

export async function duplicateNews(
  id: string
) {
  const article =
    await prisma.post.findUnique({
      where: {
        id,
      },

      include: {
        tags: true,
      },
    });

  if (!article) {
    throw new Error(
      "Article not found."
    );
  }

  /*
   * Existing assignedReporterId is already
   * a User.id because Post.assignedReporterId
   * references User.id.
   *
   * Therefore it can safely be copied.
   */
  const assignedReporterId =
    article.assignedReporterId;

  return prisma.post.create({
    data: {
      title:
        `${article.title} (Copy)`,

      slug:
        `${article.slug}-${Date.now()}`,

      content:
        article.content,

      excerpt:
        article.excerpt,

      image:
        article.image,

      video:
        article.video,

      categoryId:
        article.categoryId,

      stateId:
        article.stateId,

      districtId:
        article.districtId,

      talukaId:
        article.talukaId,

      village:
        article.village,

      seoTitle:
        article.seoTitle,

      seoDescription:
        article.seoDescription,

      seoKeywords:
        article.seoKeywords,

      canonicalUrl:
        article.canonicalUrl,

      focusKeyword:
        article.focusKeyword,

      featured:
        false,

      breaking:
        false,

      trending:
        false,

      hero:
        false,

      editorsPick:
        false,

      status:
        "DRAFT",

      authorId:
        article.authorId,

      assignedReporterId,

      assignedEditorId:
        article.assignedEditorId,

      tags: {
        connect:
          article.tags.map(
            (tag) => ({
              id: tag.id,
            })
          ),
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

export async function bulkUpdateStatus(
  ids: string[],
  status: PostStatus
) {
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

export async function bulkFeature(
  ids: string[],
  featured: boolean
) {
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

export async function bulkBreaking(
  ids: string[],
  breaking: boolean
) {
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

export async function bulkTrending(
  ids: string[],
  trending: boolean
) {
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

export async function bulkHero(
  ids: string[],
  hero: boolean
) {
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

export async function bulkEditorsPick(
  ids: string[],
  editorsPick: boolean
) {
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

export async function bulkDelete(
  ids: string[]
) {
  return prisma.post.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}