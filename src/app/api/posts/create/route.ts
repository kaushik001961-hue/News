import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PostStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    /* =====================================================
       AUTH
    ===================================================== */

    const session = await auth();

    if (
      !session?.user?.id
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /* =====================================================
       BODY
    ===================================================== */

    const body =
      await req.json();

    const {
      title,
      slug: requestedSlug,
      excerpt,
      content,

      categoryId,
      tags,

      image,
      video,

      stateId,
      districtId,
      talukaId,

      seoTitle,
      seoDescription,
      seoKeywords,

      status: requestedStatus,
    } = body;

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      !title ||
      typeof title !==
        "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "News title is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !content ||
      typeof content !==
        "string" ||
      !content.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "News content is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !categoryId ||
      typeof categoryId !==
        "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Category is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       ROLE
    ===================================================== */

    const role =
      session.user.role
        ?.toString()
        .toUpperCase();

    if (
      role !== "ADMIN" &&
      role !== "EDITOR"
    ) {
      return NextResponse.json(
        {
          error:
            "Only Admin or Editor can use this endpoint.",
        },
        {
          status: 403,
        }
      );
    }

    /* =====================================================
       STATUS
    ===================================================== */

    let status: PostStatus =
      PostStatus.DRAFT;

    if (
      requestedStatus ===
      "PENDING"
    ) {
      status =
        PostStatus.PENDING;
    }

    if (
      requestedStatus ===
      "PUBLISHED"
    ) {
      status =
        PostStatus.PUBLISHED;
    }

    /*
     * Admin/Editor can publish.
     * Reporter cannot reach this endpoint.
     */

    /* =====================================================
       SLUG
    ===================================================== */

    let slug =
      typeof requestedSlug ===
        "string" &&
      requestedSlug.trim()
        ? requestedSlug
            .trim()
            .toLowerCase()
            .replace(
              /[^a-z0-9]+/g,
              "-"
            )
            .replace(
              /(^-|-$)+/g,
              ""
            )
        : title
            .trim()
            .toLowerCase()
            .replace(
              /[^a-z0-9]+/g,
              "-"
            )
            .replace(
              /(^-|-$)+/g,
              "");

    if (!slug) {
      slug = `news-${Date.now()}`;
    }

    /* =====================================================
       UNIQUE SLUG
    ===================================================== */

    const existing =
      await prisma.post.findUnique(
        {
          where: {
            slug,
          },
          select: {
            id: true,
          },
        }
      );

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    /* =====================================================
       TAGS
    ===================================================== */

    /*
     * Your existing Post relation uses tags.
     *
     * To avoid making assumptions about the Tag
     * unique constraint, only connect existing tag IDs
     * when IDs are supplied.
     *
     * String tags can still be added later through
     * your existing tag management system.
     */

    const tagIds =
      Array.isArray(tags)
        ? tags.filter(
            (tag): tag is string =>
              typeof tag ===
                "string" &&
              tag.length > 0
          )
        : [];

    /* =====================================================
       CREATE
    ===================================================== */

    const post =
      await prisma.post.create({
        data: {
          title:
            title.trim(),

          slug,

          excerpt:
            typeof excerpt ===
              "string"
              ? excerpt.trim()
              : null,

          content:
            content.trim(),

          image:
            typeof image ===
              "string" &&
            image.trim()
              ? image.trim()
              : null,

          /*
           * YOUTUBE / LIVE URL
           */
          video:
            typeof video ===
              "string" &&
            video.trim()
              ? video.trim()
              : null,

          categoryId,

          stateId:
            typeof stateId ===
              "string" &&
            stateId.trim()
              ? stateId
              : null,

          districtId:
            typeof districtId ===
              "string" &&
            districtId.trim()
              ? districtId
              : null,

          talukaId:
            typeof talukaId ===
              "string" &&
            talukaId.trim()
              ? talukaId
              : null,

          seoTitle:
            typeof seoTitle ===
              "string" &&
            seoTitle.trim()
              ? seoTitle.trim()
              : null,

          seoDescription:
            typeof seoDescription ===
              "string" &&
            seoDescription.trim()
              ? seoDescription.trim()
              : null,

          seoKeywords:
            typeof seoKeywords ===
              "string" &&
            seoKeywords.trim()
              ? seoKeywords.trim()
              : null,

          status,

          authorId:
            session.user.id,

          submittedAt:
            status ===
            PostStatus.PENDING
              ? new Date()
              : null,

          publishedAt:
            status ===
            PostStatus.PUBLISHED
              ? new Date()
              : null,
        },
      });

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        message:
          status ===
          PostStatus.PUBLISHED
            ? "News published successfully."
            : status ===
              PostStatus.PENDING
            ? "News submitted for review."
            : "News draft saved successfully.",
        post,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE NEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}