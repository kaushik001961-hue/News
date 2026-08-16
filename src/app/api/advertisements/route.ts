import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/* =====================================================
   ALLOWED AD POSITIONS
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
   GET ADVERTISEMENTS
===================================================== */

export async function GET() {
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

    return NextResponse.json(
      advertisements
    );
  } catch (error) {
    console.error(
      "GET ADVERTISEMENTS ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch advertisements.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   CREATE ADVERTISEMENT
===================================================== */

export async function POST(
  req: Request
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

    /*
     * ADMIN and EDITOR can create advertisements.
     */

    if (
      role !== "ADMIN" &&
      role !== "EDITOR"
    ) {
      return NextResponse.json(
        {
          error:
            "You do not have permission to create advertisements.",
        },
        {
          status: 403,
        }
      );
    }

    /* =================================================
       BODY
    ================================================= */

    const body =
      await req.json();

    /* =================================================
       BASIC FIELDS
    ================================================= */

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : "";

    const slug =
      typeof body.slug === "string"
        ? body.slug.trim()
        : "";

    /* =================================================
       VALIDATE TITLE
    ================================================= */

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
       VALIDATE SLUG
    ================================================= */

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
      body.position as
        | AllowedPosition
        | undefined;

    if (
      !position ||
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
      (body.device ||
        "ALL") as AllowedDevice;

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
      Number(
        body.priority ?? 1
      );

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
        : true;

    /* =================================================
       DATES
    ================================================= */

    let startDate:
      | Date
      | null = null;

    let endDate:
      | Date
      | null = null;

    if (body.startDate) {
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

    if (body.endDate) {
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
       IMAGE / HTML / TARGET
    ================================================= */

    const image =
      typeof body.image ===
      "string" &&
      body.image.trim()
        ? body.image.trim()
        : null;

    const htmlCode =
      typeof body.htmlCode ===
      "string" &&
      body.htmlCode.trim()
        ? body.htmlCode.trim()
        : null;

    const targetUrl =
      typeof body.targetUrl ===
      "string" &&
      body.targetUrl.trim()
        ? body.targetUrl.trim()
        : null;

    /* =================================================
       CREATE
    ================================================= */

    const advertisement =
      await prisma.advertisement.create({
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

          /*
           * Save the logged-in user as creator.
           *
           * This requires createdById to exist in
           * your Advertisement Prisma model.
           */
          createdById:
            session.user.id,
        },
      });

    /* =================================================
       SUCCESS
    ================================================= */

    return NextResponse.json(
      advertisement,
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(
      "CREATE ADVERTISEMENT ERROR:",
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
       INVALID ENUM / DATABASE
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
       GENERIC ERROR
    ================================================= */

    return NextResponse.json(
      {
        error:
          "Failed to create advertisement.",
      },
      {
        status: 500,
      }
    );
  }
}