import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_POSITIONS = [
  "HEADER",
  "HOME_TOP",
  "HOME_MIDDLE",
  "HOME_BOTTOM",
  "SIDEBAR_TOP",
  "SIDEBAR_MIDDLE",
  "SIDEBAR_BOTTOM",
  "ARTICLE_TOP",
  "ARTICLE_MIDDLE",
  "ARTICLE_BOTTOM",
  "FOOTER",
] as const;

const VALID_DEVICES = [
  "MOBILE",
  "DESKTOP",
  "ALL",
  "TABLET",
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
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
    } = body;

    // --------------------------------------------------
    // Validation
    // --------------------------------------------------

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Advertisement title is required." },
        { status: 400 }
      );
    }

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Advertisement slug is required." },
        { status: 400 }
      );
    }

    if (
      !VALID_POSITIONS.includes(
        position as (typeof VALID_POSITIONS)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Invalid advertisement position." },
        { status: 400 }
      );
    }

    if (
      !VALID_DEVICES.includes(
        device as (typeof VALID_DEVICES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Invalid advertisement device." },
        { status: 400 }
      );
    }

    // At least one creative is required
    if (
      (!image || typeof image !== "string") &&
      (!htmlCode || typeof htmlCode !== "string")
    ) {
      return NextResponse.json(
        {
          error:
            "Either an advertisement image or HTML code is required.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Check duplicate slug
    // --------------------------------------------------

    const existing = await prisma.advertisement.findUnique({
      where: {
        slug: slug.trim(),
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "An advertisement with this slug already exists.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // Validate dates
    // --------------------------------------------------

    let parsedStartDate: Date | null = null;
    let parsedEndDate: Date | null = null;

    if (startDate) {
      parsedStartDate = new Date(startDate);

      if (Number.isNaN(parsedStartDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid start date." },
          { status: 400 }
        );
      }
    }

    if (endDate) {
      parsedEndDate = new Date(endDate);

      if (Number.isNaN(parsedEndDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid end date." },
          { status: 400 }
        );
      }
    }

    if (
      parsedStartDate &&
      parsedEndDate &&
      parsedEndDate < parsedStartDate
    ) {
      return NextResponse.json(
        {
          error:
            "End date cannot be earlier than start date.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Create advertisement
    // --------------------------------------------------

    const advertisement =
      await prisma.advertisement.create({
        data: {
          title: title.trim(),

          slug: slug
            .trim()
            .toLowerCase(),

          image:
            typeof image === "string" &&
            image.trim()
              ? image.trim()
              : null,

          htmlCode:
            typeof htmlCode === "string" &&
            htmlCode.trim()
              ? htmlCode.trim()
              : null,

          targetUrl:
            typeof targetUrl === "string" &&
            targetUrl.trim()
              ? targetUrl.trim()
              : null,

          position:
            position as (typeof VALID_POSITIONS)[number],

          device:
            device as (typeof VALID_DEVICES)[number],

          priority:
            typeof priority === "number"
              ? priority
              : Number(priority) || 1,

          active:
            typeof active === "boolean"
              ? active
              : true,

          startDate: parsedStartDate,
          endDate: parsedEndDate,
        },
      });

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        advertisement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE ADVERTISEMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create advertisement.",
      },
      { status: 500 }
    );
  }
}