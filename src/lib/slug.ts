/**
 * Generate SEO-friendly slug
 */

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Generate unique slug if duplicate exists
 */

import { prisma } from "@/lib/prisma";

export async function generateUniqueSlug(
  title: string
): Promise<string> {

  const baseSlug = generateSlug(title);

  let slug = baseSlug;

  let counter = 1;

  while (true) {

    const exists = await prisma.post.findUnique({

      where: {

        slug,

      },

    });

    if (!exists) {

      break;

    }

    slug = `${baseSlug}-${counter}`;

    counter++;

  }

  return slug;

}
