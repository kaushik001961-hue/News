import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface GetNewsOptions {
  page?: number;
  pageSize?: number;

  search?: string;
  status?: string;
  category?: string;
  reporter?: string;

  sort?: string;

  role?: "ADMIN" | "EDITOR" | "REPORTER";
  userId?: string;
}

export async function getNews({
  page = 1,
  pageSize = 10,

  search = "",
  status = "",
  category = "",
  reporter = "",

  sort = "latest",

  role,
  userId,
}: GetNewsOptions) {
  const where: Prisma.PostWhereInput = {};

  // Search
  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        excerpt: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        content: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // Status
  if (status && status !== "ALL") {
    where.status = status as any;
  }

  // Category
  if (category) {
    where.categoryId = category;
  }

  // Assigned Reporter
  if (reporter) {
    where.assignedReporterId = reporter;
  }

  // Reporter should only see own news
  if (role === "REPORTER" && userId) {
    where.authorId = userId;
  }

  // Sorting
  let orderBy: Prisma.PostOrderByWithRelationInput = {
    createdAt: "desc",
  };

  switch (sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "views":
      orderBy = {
        views: "desc",
      };
      break;

    case "title-asc":
      orderBy = {
        title: "asc",
      };
      break;

    case "title-desc":
      orderBy = {
        title: "desc",
      };
      break;
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,

      include: {
        category: true,

        assignedReporter: {
          select: {
            id: true,
            name: true,
            email: true,

            reporter: {
              select: {
                reporterId: true,
                firstName: true,
                lastName: true,
                designation: true,
              },
            },
          },
        },

        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },

      orderBy,

      skip: (page - 1) * pageSize,

      take: pageSize,
    }),

    prisma.post.count({
      where,
    }),
  ]);

  // Convert database structure into the format expected by NewsTable
  const news = posts.map((post) => ({
    ...post,

    featuredImage: post.image,

    videoUrl: post.video,

    reporter: post.assignedReporter
      ? {
          id: post.assignedReporter.id,

          firstName:
            post.assignedReporter.reporter?.firstName ??
            post.assignedReporter.name,

          lastName:
            post.assignedReporter.reporter?.lastName ??
            "",

          designation:
            post.assignedReporter.reporter?.designation ??
            null,
        }
      : null,
  }));

  return {
    news,
    total,
    page,
    totalPages: Math.ceil(total / pageSize),
  };
}