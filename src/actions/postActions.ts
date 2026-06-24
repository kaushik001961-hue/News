"use server";

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
  tags?: string; // Comma separated tags string, e.g., "Politics, Tech"
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

// Helper to convert comma-separated string tags to unique slug array for Prisma relation connect
const formatTagsRelation = (tagsString?: string) => {
  if (!tagsString || !tagsString.trim()) return undefined;
  
  const tagList = tagsString.split(",").map(t => t.trim()).filter(Boolean);
  
  return {
    connect: tagList.map(tagName => ({
      slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }))
  };
};

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
      // Fixed: Use Prisma's relational connect syntax
      tags: formatTagsRelation(data.tags),
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
  });

  return {
    success: true,
    post,
  };
}

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

  return {
    success: true,
    post,
  };
}

export async function updatePost(
  id: string,
  data: Partial<PostInput>
) {
  // Build safe updatable fields payload
  const updatePayload: any = { ...data };

  if (data.title) {
    updatePayload.slug = generateSlug(data.title);
  }

  // Fixed: Safely format tags relation if they are included in the update payload
  if ('tags' in data) {
    updatePayload.tags = formatTagsRelation(data.tags);
  }

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: updatePayload,
  });

  return {
    success: true,
    post,
  };
}

export async function deletePost(id: string) {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      status: "REJECTED",
    },
  });

  return {
    success: true,
  };
}

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
      tags: true, // Included tags layout retrieval automatically
    },
  });
}

export async function getPosts() {
  return prisma.post.findMany({
    include: {
      author: true,
      category: true,
      state: true,
      district: true,
      taluka: true,
      tags: true, // Included tags layout retrieval automatically
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

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