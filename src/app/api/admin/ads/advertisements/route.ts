import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

/* =========================================================
   AUTH HELPERS
========================================================= */

async function getSession() {
  return await auth();
}

async function canViewAdvertisements() {
  const session = await getSession();

  const role = session?.user?.role;

  return (
    role === "ADMIN" ||
    role === "EDITOR"
  );
}

async function canManageAdvertisements() {
  const session = await getSession();

  const role = session?.user?.role;

  return (
    role === "ADMIN" ||
    role === "EDITOR"
  );
}

async function isAdmin() {
  const session = await getSession();

  return session?.user?.role === "ADMIN";
}

/* =========================================================
   GET
   ADMIN + EDITOR
========================================================= */

export async function GET() {
  try {
    if (!(await canViewAdvertisements())) {
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

    const advertisements =
      await prisma.advertisement.findMany({
        orderBy: [
          {
            priority: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      advertisements,
    });
  } catch (error) {
    console.error(
      "GET Advertisements Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch advertisements.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   CREATE
   ADMIN + EDITOR
========================================================= */

export async function POST(
  req: NextRequest
) {
  try {
    if (!(await canManageAdvertisements())) {
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

    const body = await req.json();

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : "";

    const slug =
      typeof body.slug === "string"
        ? body.slug.trim()
        : "";

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Advertisement title is required.",
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
            "Advertisement slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       CHECK DUPLICATE SLUG
    ===================================================== */

    const existing =
      await prisma.advertisement.findUnique({
        where: {
          slug,
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "An advertisement with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       CREATE AD
    ===================================================== */

    const advertisement =
      await prisma.advertisement.create({
        data: {
          title,
          slug,

          image:
            body.image || null,

          htmlCode:
            body.htmlCode || null,

          targetUrl:
            body.targetUrl || null,

          position:
            body.position,

          device:
            body.device || "ALL",

          priority:
            Number.isFinite(
              Number(body.priority)
            )
              ? Number(body.priority)
              : 1,

          active:
            body.active !== false,

          startDate:
            body.startDate
              ? new Date(body.startDate)
              : null,

          endDate:
            body.endDate
              ? new Date(body.endDate)
              : null,
        },
      });

    return NextResponse.json(
      {
        success: true,
        advertisement,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE Advertisement Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create advertisement.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   UPDATE
   ADMIN + EDITOR
========================================================= */

export async function PATCH(
  req: NextRequest
) {
  try {
    if (!(await canManageAdvertisements())) {
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

    const body = await req.json();

    const id = body.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Advertisement id is required.",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.advertisement.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Advertisement not found.",
        },
        {
          status: 404,
        }
      );
    }

    const data: Record<
      string,
      unknown
    > = {};

    if (
      typeof body.title === "string"
    ) {
      data.title =
        body.title.trim();
    }

    if (
      typeof body.slug === "string"
    ) {
      data.slug =
        body.slug.trim();
    }

    if (
      body.image !== undefined
    ) {
      data.image =
        body.image || null;
    }

    if (
      body.htmlCode !== undefined
    ) {
      data.htmlCode =
        body.htmlCode || null;
    }

    if (
      body.targetUrl !== undefined
    ) {
      data.targetUrl =
        body.targetUrl || null;
    }

    if (
      body.position !== undefined
    ) {
      data.position =
        body.position;
    }

    if (
      body.device !== undefined
    ) {
      data.device =
        body.device;
    }

    if (
      body.priority !== undefined
    ) {
      data.priority =
        Number(body.priority);
    }

    if (
      body.active !== undefined
    ) {
      data.active =
        Boolean(body.active);
    }

    if (
      body.startDate !== undefined
    ) {
      data.startDate =
        body.startDate
          ? new Date(body.startDate)
          : null;
    }

    if (
      body.endDate !== undefined
    ) {
      data.endDate =
        body.endDate
          ? new Date(body.endDate)
          : null;
    }

    const advertisement =
      await prisma.advertisement.update({
        where: {
          id,
        },
        data,
      });

    return NextResponse.json({
      success: true,
      advertisement,
    });
  } catch (error) {
    console.error(
      "UPDATE Advertisement Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update advertisement.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE
   ADMIN ONLY
========================================================= */

export async function DELETE(
  req: NextRequest
) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only administrators can delete advertisements.",
        },
        {
          status: 403,
        }
      );
    }

    const id =
      new URL(req.url)
        .searchParams
        .get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Advertisement id is required.",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.advertisement.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Advertisement not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.advertisement.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Advertisement deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE Advertisement Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to delete advertisement.",
      },
      {
        status: 500,
      }
    );
  }
}