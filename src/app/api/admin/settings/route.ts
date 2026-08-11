// src/app/api/admin/settings/route.ts

import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

/* =========================================================
   AUTH HELPERS
========================================================= */

/**
 * ADMIN + EDITOR
 *
 * Editors can view settings.
 */
async function canViewSettings() {
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
 * Only administrators can change settings.
 */
async function isAdmin() {
  const session = await auth();

  return session?.user?.role === "ADMIN";
}

/* =========================================================
   GET SETTINGS
   ADMIN + EDITOR
========================================================= */

export async function GET() {
  try {
    if (!(await canViewSettings())) {
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

    /*
     * -----------------------------------------------------
     * Settings persistence is not implemented yet.
     *
     * Your current API does not have a Prisma settings
     * model or storage implementation.
     *
     * Replace this object later with your actual settings
     * database/configuration store.
     * -----------------------------------------------------
     */

    const settings = {};

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(
      "GET Settings Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch settings.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   UPDATE SETTINGS
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
            "Only administrators can update settings.",
        },
        {
          status: 403,
        }
      );
    }

    const body = await req.json();

    /*
     * -----------------------------------------------------
     * SAVE / UPDATE SETTINGS
     *
     * Your original implementation does not currently
     * contain a Prisma settings model or persistence logic.
     *
     * Keep your actual save/update implementation here
     * when the settings storage is available.
     * -----------------------------------------------------
     */

    const settings = body;

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(
      "UPDATE Settings Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to update settings.",
      },
      {
        status: 500,
      }
    );
  }
}