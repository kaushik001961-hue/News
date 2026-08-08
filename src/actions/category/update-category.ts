"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface UpdateCategoryInput {
  id: string;

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

export async function updateCategory(
  data: UpdateCategoryInput
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  const category = await prisma.category.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!category) {
    throw new Error("Category not found.");
  }

  const name = data.name.trim();

  if (!name) {
    throw new Error("Category name is required.");
  }

  // Generate slug

  let slug =
    data.slug?.trim() ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  // Duplicate name

  const existingName =
    await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        NOT: {
          id: data.id,
        },
      },
    });

  if (existingName) {
    throw new Error(
      "Category name already exists."
    );
  }

  // Duplicate slug

  const existingSlug =
    await prisma.category.findFirst({
      where: {
        slug,
        NOT: {
          id: data.id,
        },
      },
    });

  if (existingSlug) {
    slug = `${slug}-${Date.now()}`;
  }

  // Prevent self parent

  if (
    data.parentId &&
    data.parentId === data.id
  ) {
    throw new Error(
      "Category cannot be its own parent."
    );
  }

  await prisma.category.update({
    where: {
      id: data.id,
    },

    data: {
      name,

      slug,

      description: data.description,

      parentId:
        data.parentId || null,

      color:
        data.color || "#2563eb",

      image: data.image,

      active: data.active,

      featured: data.featured,

      seoTitle: data.seoTitle,

      seoDescription:
        data.seoDescription,

      seoKeywords:
        data.seoKeywords,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  revalidatePath(`/category/${slug}`);

  redirect("/admin/categories");
}