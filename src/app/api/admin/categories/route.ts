// src/app/api/admin/categories/route.ts

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

/* =========================================================
   AUTH HELPERS
========================================================= */

/**
 * ADMIN + EDITOR
 *
 * Editors can view categories.
 */
async function canViewCategories() {
  const session = await auth();

  const role = session?.user?.role;

  return (
    role === "ADMIN" ||
    role === "EDITOR"
  );
}

/**
 * ADMIN ONLY
 *
 * Used for creating categories.
 */
async function isAdmin() {
  const session = await auth();

  return session?.user?.role === "ADMIN";
}

/* =========================================================
   GET ALL CATEGORIES
   ADMIN + EDITOR
========================================================= */

export async function GET() {
  try {
    if (!(await canViewCategories())) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const categories =
      await prisma.category.findMany({
        orderBy: {
          name: "asc",
        },
      });

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error(
      "GET Categories Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   CREATE CATEGORY
   ADMIN ONLY
========================================================= */

export async function POST(
  req: Request
) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only administrators can create categories.",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const slug =
      typeof body.slug === "string"
        ? body.slug.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Category name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Category slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       CHECK DUPLICATE NAME
    ===================================================== */

    const existingName =
      await prisma.category.findFirst({
        where: {
          name: {
            equals: name,
            mode: "insensitive",
          },
        },
      });

    if (existingName) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A category with this name already exists.",
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       CHECK DUPLICATE SLUG
    ===================================================== */

    const existingSlug =
      await prisma.category.findUnique({
        where: {
          slug,
        },
      });

    if (existingSlug) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A category with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       CREATE
    ===================================================== */

    const category =
      await prisma.category.create({
        data: {
          name,
          slug,
        },
      });

    return NextResponse.json(
      {
        success: true,
        category,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE Category Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to create category",
      },
      {
        status: 500,
      }
    );
  }
}