"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { postSchema } from "@/lib/validation";

export interface PostInput {
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  video?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string;
  breaking?: boolean;
  featured?: boolean;
  categoryId?: string;
  geography?: string;
  stateId?: string;
  districtId?: string;
  talukaId?: string;
  village?: string;
  authorId: string;
}

// -----------------------------------------
// Helper: Convert comma-separated tags
// -----------------------------------------

const buildTagRelation = (tagsString?: string) => {
  if (!tagsString || !tagsString.trim()) {
    return { set: [] };
  }

  const tagList = tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    set: [],
    connect: tagList.map((tag) => ({
      slug: tag
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
    })),
  };
};

// -----------------------------------------
// Create Draft
// -----------------------------------------

export async function saveDraft(data: PostInput) {
  const parsed = postSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  const slug = generateSlug(data.title);

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      video: data.video,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,

      tags: buildTagRelation(data.tags),

      breaking: data.breaking ?? false,
      featured: data.featured ?? false,

      geography: data.geography as any,

      stateId: data.stateId,
      districtId: data.districtId,
      talukaId: data.talukaId,
      village: data.village,

      authorId: data.authorId,
      categoryId: data.categoryId,

      status: "DRAFT",
    },

    include: {
      tags: true,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/");

  return {
    success: true,
    post,
  };
}

// -----------------------------------------
// Publish Post
// -----------------------------------------

export async function publishPost(id: string) {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/posts");

  return {
    success: true,
    post,
  };
}

// -----------------------------------------
// Update Post
// -----------------------------------------

export async function updatePost(
  id: string,
  data: Partial<PostInput>
) {
  const updateData: any = {
    ...data,
  };

  if (data.title) {
    updateData.slug = generateSlug(data.title);
  }

  if ("tags" in data) {
    updateData.tags = buildTagRelation(data.tags);
  }

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: updateData,

    include: {
      author: true,
      category: true,
      state: true,
      district: true,
      taluka: true,
      tags: true,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath(`/news/${post.slug}`);

  return {
    success: true,
    post,
  };
}

// -----------------------------------------
// Soft Delete
// -----------------------------------------

export async function deletePost(id: string) {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      status: "REJECTED",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/posts");

  return {
    success: true,
  };
}

// -----------------------------------------
// Get Single Post
// -----------------------------------------

export async function getPost(id: string) {
  return prisma.post.findUnique({
    where: {
      id,
    },

    include: {
      author: true,
      category: true,
      state: true,
      district: true,
      taluka: true,
      tags: true,
    },
  });
}

// -----------------------------------------
// Get All Posts
// -----------------------------------------

export async function getPosts() {
  return prisma.post.findMany({
    include: {
      author: true,
      category: true,
      state: true,
      district: true,
      taluka: true,
      tags: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

// -----------------------------------------
// Increment Views
// -----------------------------------------

export async function incrementViews(id: string) {
  await prisma.post.update({
    where: {
      id,
    },

    data: {
      views: {
        increment: 1,
      },
    },
  });
}