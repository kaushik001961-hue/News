"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { postSchema } from "@/lib/validation";
import { auth } from "@/lib/auth";
import { PostStatus, Prisma } from "@prisma/client";

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
}

// -----------------------------------------
// Helper Functions
// -----------------------------------------
const slugifyTag = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const buildTagCreateRelation = (tagsString?: string) => {
  if (!tagsString || !tagsString.trim()) {
    return undefined;
  }

  const tagList = tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (tagList.length === 0) return undefined;

  return {
    connectOrCreate: tagList.map((tag) => ({
      where: { slug: slugifyTag(tag) },
      create: { name: tag, slug: slugifyTag(tag) },
    })),
  };
};

const buildTagUpdateRelation = (tagsString?: string) => {
  if (!tagsString || !tagsString.trim()) {
    return { set: [] };
  }

  const tagList = tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    set: [],
    connectOrCreate: tagList.map((tag) => ({
      where: { slug: slugifyTag(tag) },
      create: { name: tag, slug: slugifyTag(tag) },
    })),
  };
};

// -----------------------------------------
// Review / Workflow Actions
// -----------------------------------------
export async function sendForApproval(id: string) {
  return prisma.post.update({
    where: { id },
    data: { status: PostStatus.PENDING },
  });
}

export async function submitForReview(id: string) {
  return prisma.post.update({
    where: { id },
    data: { status: PostStatus.PENDING },
  });
}

export async function approveByEditor(id: string) {
  return prisma.post.update({
    where: { id },
    data: { status: PostStatus.PUBLISHED },
  });
}

export async function rejectPost(id: string) {
  return prisma.post.update({
    where: { id },
    data: { status: PostStatus.REJECTED },
  });
}

// -----------------------------------------
// Save Draft
// -----------------------------------------
export async function saveDraft(data: PostInput) {
  const parsed = postSchema.safeParse(data);

  if (!parsed.success) {
    console.error("❌ VALIDATION FAILED FOR DRAFT PAYLOAD:", parsed.error.flatten().fieldErrors);
    return {
      success: false,
      error: "Validation failed.",
      errors: parsed.error.flatten(),
    };
  }

  const session = await auth();

  console.log("========== SAVE DRAFT ==========");
  console.log("Session:", session);
  console.log("Payload Checked & Validated Successfully");

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Please login first.",
    };
  }

  const slug = generateSlug(data.title || "untitled-draft");
  const tagRelation = buildTagCreateRelation(data.tags);

  try {
    const post = await prisma.post.create({
      data: {
        title: data.title || "Untitled Draft",
        slug,
        content: data.content || "",
        excerpt: data.excerpt,
        image: data.image,
        video: data.video,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        ...(tagRelation ? { tags: tagRelation } : {}),
        breaking: data.breaking ?? false,
        featured: data.featured ?? false,
        geography: data.geography as any,
        stateId: data.stateId || null,
        districtId: data.districtId || null,
        talukaId: data.talukaId || null,
        village: data.village || null,
        categoryId: data.categoryId || null,
        authorId: session.user.id,
        status: PostStatus.DRAFT,
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

    revalidatePath("/");
    revalidatePath("/admin/posts");

    return {
      success: true,
      post,
    };
  } catch (error: any) {
    console.error("🔥 Prisma Engine Save Draft Error:", error);
    return {
      success: false,
      error: error?.message || "Database entry execution crash.",
    };
  }
}

// -----------------------------------------
// Publish Post
// -----------------------------------------
export async function publishPost(id: string) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(),
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

    revalidatePath("/");
    revalidatePath("/admin/posts");
    revalidatePath(`/news/${post.slug}`);

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error("Publish Error:", error);
    return {
      success: false,
      error: "Failed to publish post.",
    };
  }
}

// -----------------------------------------
// Update Post
// -----------------------------------------
export async function updatePost(id: string, data: Partial<PostInput>) {
  try {
    const updateData: any = { ...data };

    if (data.title) {
      updateData.slug = generateSlug(data.title);
    }

    if ("tags" in data) {
      updateData.tags = buildTagUpdateRelation(data.tags);
    }

    if (data.geography) {
      updateData.geography = data.geography;
    }

    if (data.stateId === "") updateData.stateId = null;
    if (data.districtId === "") updateData.districtId = null;
    if (data.talukaId === "") updateData.talukaId = null;
    if (data.categoryId === "") updateData.categoryId = null;
    if (data.village === "") updateData.village = null;

    delete updateData.authorId;

    const post = await prisma.post.update({
      where: { id },
      data: updateData as Prisma.PostUpdateInput,
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
  } catch (error) {
    console.error("Update Error:", error);
    return {
      success: false,
      error: "Failed to update post.",
    };
  }
}

// -----------------------------------------
// Soft Delete
// -----------------------------------------
export async function deletePost(id: string) {
  try {
    await prisma.post.update({
      where: { id },
      data: { status: PostStatus.REJECTED },
    });

    revalidatePath("/");
    revalidatePath("/admin/posts");

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return {
      success: false,
      error: "Failed to delete post.",
    };
  }
}

// -----------------------------------------
// Get Single Post
// -----------------------------------------
export async function getPost(id: string) {
  try {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        category: true,
        state: true,
        district: true,
        taluka: true,
        tags: true,
      },
    });
  } catch (error) {
    console.error("Get Post Error:", error);
    return null;
  }
}

// -----------------------------------------
// Get All Posts
// -----------------------------------------
export async function getPosts() {
  try {
    return await prisma.post.findMany({
      include: {
        author: true,
        category: true,
        state: true,
        district: true,
        taluka: true,
        tags: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Get Posts Error:", error);
    return [];
  }
}

// -----------------------------------------
// Increment Views
// -----------------------------------------
export async function incrementViews(id: string) {
  try {
    await prisma.post.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
    });
  } catch (error) {
    console.error("Increment Views Error:", error);
  }
}