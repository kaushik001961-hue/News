"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateCategoryInput {
  name: string;
  slug?: string;

  description?: string;

  parentId?: string | null;

  color?: string | null;

  image?: string | null;

  active: boolean;

  featured: boolean;

  seoTitle?: string;

  seoDescription?: string;

  seoKeywords?: string;
}

export async function createCategory(
  data: CreateCategoryInput
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  const name = data.name.trim();

  if (!name) {
    throw new Error("Category name is required.");
  }

  // Generate slug if empty
  let slug =
    data.slug?.trim() ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  // Ensure unique slug
  const existingSlug = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (existingSlug) {
    slug = `${slug}-${Date.now()}`;
  }

  // Prevent duplicate category names
  const existingName = await prisma.category.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (existingName) {
    throw new Error("Category already exists.");
  }

  await prisma.category.create({
    data: {
      name,
      slug,

      description: data.description,

      parentId: data.parentId || null,

      color: data.color || "#2563eb",

      image: data.image,

      active: data.active,

      featured: data.featured,

      seoTitle: data.seoTitle,

      seoDescription: data.seoDescription,

      seoKeywords: data.seoKeywords,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");

  redirect("/admin/categories");
}