import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/* =====================================================
   ALLOWED POSITIONS
===================================================== */

const ALLOWED_POSITIONS = [
  "SIDEBAR_TOP_LEFT",
  "SIDEBAR_TOP_RIGHT",
  "POPUP",
] as const;

type AllowedPosition =
  (typeof ALLOWED_POSITIONS)[number];

/* =====================================================
   ALLOWED DEVICES
===================================================== */

const ALLOWED_DEVICES = [
  "MOBILE",
  "DESKTOP",
  "ALL",
  "TABLET",
] as const;

type AllowedDevice =
  (typeof ALLOWED_DEVICES)[number];

/* =====================================================
   PARAMS
===================================================== */

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/* =====================================================
   GET SINGLE ADVERTISEMENT
===================================================== */

export async function GET(
  _req: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } =
      await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Advertisement ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const advertisement =
      await prisma.advertisement.findUnique({
        where: {
          id,
        },
      });

    if (!advertisement) {
      return NextResponse.json(
        {
          error:
            "Advertisement not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      advertisement
    );
  } catch (error) {
    console.error(
      "GET ADVERTISEMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch advertisement.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   UPDATE ADVERTISEMENT
===================================================== */

export async function PUT(
  req: Request,
  context: RouteContext
) {
  try {
    /* =================================================
       AUTH
    ================================================= */

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /* =================================================
       ROLE
    ================================================= */

    const role =
      session.user.role;

    if (
      role !== "ADMIN" &&
      role !== "EDITOR"
    ) {
      return NextResponse.json(
        {
          error:
            "You do not have permission to update advertisements.",
        },
        {
          status: 403,
        }
      );
    }

    /* =================================================
       ID
    ================================================= */

    const { id } =
      await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Advertisement ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       CHECK EXISTING
    ================================================= */

    const existing =
      await prisma.advertisement.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error:
            "Advertisement not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* =================================================
       BODY
    ================================================= */

    const body =
      await req.json();

    /* =================================================
       TITLE
    ================================================= */

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : existing.title;

    if (!title) {
      return NextResponse.json(
        {
          error:
            "Advertisement title is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       SLUG
    ================================================= */

    const slug =
      typeof body.slug === "string"
        ? body.slug.trim()
        : existing.slug;

    if (!slug) {
      return NextResponse.json(
        {
          error:
            "Advertisement slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       POSITION
    ================================================= */

    const position =
      (body.position ??
        existing.position) as
        | AllowedPosition;

    if (
      !ALLOWED_POSITIONS.includes(
        position
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid advertisement position.",
          allowedPositions:
            ALLOWED_POSITIONS,
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       DEVICE
    ================================================= */

    const device =
      (body.device ??
        existing.device) as AllowedDevice;

    if (
      !ALLOWED_DEVICES.includes(
        device
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid advertisement device.",
          allowedDevices:
            ALLOWED_DEVICES,
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       PRIORITY
    ================================================= */

    const priority =
      body.priority !==
      undefined
        ? Number(body.priority)
        : existing.priority;

    if (
      !Number.isFinite(priority)
    ) {
      return NextResponse.json(
        {
          error:
            "Advertisement priority must be a valid number.",
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       ACTIVE
    ================================================= */

    const active =
      typeof body.active ===
      "boolean"
        ? body.active
        : existing.active;

    /* =================================================
       DATES
    ================================================= */

    let startDate =
      existing.startDate;

    let endDate =
      existing.endDate;

    if (
      body.startDate !==
      undefined
    ) {
      if (
        body.startDate ===
        null ||
        body.startDate ===
        ""
      ) {
        startDate = null;
      } else {
        const parsedStart =
          new Date(
            body.startDate
          );

        if (
          Number.isNaN(
            parsedStart.getTime()
          )
        ) {
          return NextResponse.json(
            {
              error:
                "Invalid start date.",
            },
            {
              status: 400,
            }
          );
        }

        startDate =
          parsedStart;
      }
    }

    if (
      body.endDate !==
      undefined
    ) {
      if (
        body.endDate ===
        null ||
        body.endDate ===
        ""
      ) {
        endDate = null;
      } else {
        const parsedEnd =
          new Date(
            body.endDate
          );

        if (
          Number.isNaN(
            parsedEnd.getTime()
          )
        ) {
          return NextResponse.json(
            {
              error:
                "Invalid end date.",
            },
            {
              status: 400,
            }
          );
        }

        endDate =
          parsedEnd;
      }
    }

    if (
      startDate &&
      endDate &&
      startDate > endDate
    ) {
      return NextResponse.json(
        {
          error:
            "End date cannot be earlier than start date.",
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       IMAGE
    ================================================= */

    const image =
      body.image !==
      undefined
        ? typeof body.image ===
            "string" &&
          body.image.trim()
          ? body.image.trim()
          : null
        : existing.image;

    /* =================================================
       HTML
    ================================================= */

    const htmlCode =
      body.htmlCode !==
      undefined
        ? typeof body.htmlCode ===
            "string" &&
          body.htmlCode.trim()
          ? body.htmlCode.trim()
          : null
        : existing.htmlCode;

    /* =================================================
       TARGET URL
    ================================================= */

    const targetUrl =
      body.targetUrl !==
      undefined
        ? typeof body.targetUrl ===
            "string" &&
          body.targetUrl.trim()
          ? body.targetUrl.trim()
          : null
        : existing.targetUrl;

    /* =================================================
       UPDATE
    ================================================= */

    const advertisement =
      await prisma.advertisement.update({
        where: {
          id,
        },

        data: {
          title,
          slug,
          image,
          htmlCode,
          targetUrl,
          position,
          device,
          priority,
          active,
          startDate,
          endDate,
        },
      });

    /* =================================================
       SUCCESS
    ================================================= */

    return NextResponse.json(
      advertisement
    );
  } catch (error: any) {
    console.error(
      "UPDATE ADVERTISEMENT ERROR:",
      error
    );

    /* =================================================
       DUPLICATE SLUG
    ================================================= */

    if (
      error?.code === "P2002"
    ) {
      return NextResponse.json(
        {
          error:
            "An advertisement with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    /* =================================================
       NOT FOUND
    ================================================= */

    if (
      error?.code === "P2025"
    ) {
      return NextResponse.json(
        {
          error:
            "Advertisement not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* =================================================
       DATABASE SCHEMA
    ================================================= */

    if (
      error?.code === "P2022"
    ) {
      return NextResponse.json(
        {
          error:
            "Advertisement database schema is out of sync. Run Prisma db push and generate.",
        },
        {
          status: 500,
        }
      );
    }

    /* =================================================
       GENERIC
    ================================================= */

    return NextResponse.json(
      {
        error:
          "Failed to update advertisement.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   DELETE ADVERTISEMENT
===================================================== */

export async function DELETE(
  _req: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const role =
      session.user.role;

    if (
      role !== "ADMIN" &&
      role !== "EDITOR"
    ) {
      return NextResponse.json(
        {
          error:
            "You do not have permission to delete advertisements.",
        },
        {
          status: 403,
        }
      );
    }

    const { id } =
      await context.params;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Advertisement ID is required.",
        },
        {
          status: 400,
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
  } catch (error: any) {
    console.error(
      "DELETE ADVERTISEMENT ERROR:",
      error
    );

    if (
      error?.code === "P2025"
    ) {
      return NextResponse.json(
        {
          error:
            "Advertisement not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          "Failed to delete advertisement.",
      },
      {
        status: 500,
      }
    );
  }
}