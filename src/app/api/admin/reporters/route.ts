import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import {
  ReporterStatus,
  ReporterActivityType,
} from "@prisma/client";

import { logReporterActivity } from "@/lib/reporterActivity";
import { auth } from "@/lib/auth";

/* ======================================================
   AUTH HELPERS
====================================================== */

/**
 * ADMIN only
 *
 * Used for actions that modify reporter records:
 * APPROVE
 * REJECT
 * SUSPEND
 * ACTIVATE
 * DELETE
 */
async function isAdmin() {
  const session = await auth();

  return session?.user?.role === "ADMIN";
}

/**
 * ADMIN + EDITOR
 *
 * Used for reading reporter data.
 */
async function canViewReporters() {
  const session = await auth();

  const role = session?.user?.role;

  return (
    role === "ADMIN" ||
    role === "EDITOR"
  );
}

/* ======================================================
   REPORTER ID GENERATOR
   Example: AGS-REP-000001
====================================================== */

async function generateReporterId() {
  const lastReporter =
    await prisma.reporter.findFirst({
      where: {
        reporterId: {
          not: null,
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        reporterId: true,
      },
    });

  if (!lastReporter?.reporterId) {
    return "AGS-REP-000001";
  }

  const match =
    lastReporter.reporterId.match(/\d+$/);

  const next =
    match && match[0]
      ? Number(match[0]) + 1
      : 1;

  return `AGS-REP-${next
    .toString()
    .padStart(6, "0")}`;
}

/* ======================================================
   STATUS VALIDATION
====================================================== */

function canApprove(
  status: ReporterStatus
) {
  return (
    status === ReporterStatus.PENDING
  );
}

function canReject(
  status: ReporterStatus
) {
  return (
    status === ReporterStatus.PENDING
  );
}

function canSuspend(
  status: ReporterStatus
) {
  return (
    status === ReporterStatus.APPROVED
  );
}

function canActivate(
  status: ReporterStatus
) {
  return (
    status === ReporterStatus.SUSPENDED ||
    status === ReporterStatus.REJECTED
  );
}

/* ======================================================
   COMMON ERROR RESPONSE
====================================================== */

function errorResponse(
  message: string,
  status = 400
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    {
      status,
    }
  );
}

/* ======================================================
   GET REPORTERS
   ADMIN + EDITOR
====================================================== */

export async function GET() {

  /*
   * IMPORTANT:
   *
   * Editors are allowed to VIEW reporter data.
   * Only Admins are allowed to modify reporter data.
   */
  if (!(await canViewReporters())) {
    return errorResponse(
      "Unauthorized",
      401
    );
  }

  try {

    const reporters =
      await prisma.reporter.findMany({

        include: {
          ReporterDocument: true,
          PressCard: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    const response =
      reporters.map((reporter) => ({
        id: reporter.id,

        reporterId:
          reporter.reporterId,

        applicationNo:
          reporter.applicationNo,

        firstName:
          reporter.firstName,

        middleName:
          reporter.middleName,

        lastName:
          reporter.lastName,

        email:
          reporter.email,

        phone:
          reporter.phone,

        district:
          reporter.district,

        state:
          reporter.state,

        beat:
          reporter.beat,

        designation:
          reporter.designation,

        experience:
          reporter.experience,

        status:
          reporter.status,

        photo:
          reporter.photo,

        verified:
          reporter.verified,

        active:
          reporter.active,

        createdAt:
          reporter.createdAt,

        updatedAt:
          reporter.updatedAt,

        documents:
          reporter.ReporterDocument,

        pressCard:
          reporter.PressCard,
      }));

    return NextResponse.json({
      success: true,

      total:
        response.length,

      reporters:
        response,
    });

  } catch (error) {

    console.error(
      "GET Reporter Error:",
      error
    );

    return errorResponse(
      error instanceof Error
        ? error.message
        : "Failed to fetch reporters.",
      500
    );
  }
}

/* ======================================================
   PATCH
   ADMIN ONLY
   APPROVE / REJECT / SUSPEND / ACTIVATE
====================================================== */

export async function PATCH(
  req: NextRequest
) {

  /*
   * Do NOT allow Editor to modify
   * reporter status.
   */
  if (!(await isAdmin())) {
    return errorResponse(
      "Only administrators can modify reporters.",
      403
    );
  }

  try {

    const body =
      await req.json();

    const {
      id,
      action,
      remarks,
      rejectReason,
    } = body;

    if (!id || !action) {
      return errorResponse(
        "Missing required fields."
      );
    }

    const reporter =
      await prisma.reporter.findUnique({
        where: {
          id,
        },
      });

    if (!reporter) {
      return errorResponse(
        "Reporter not found.",
        404
      );
    }

    /* ==================================================
       APPROVE
    ================================================== */

    if (action === "APPROVE") {

      if (
        !canApprove(
          reporter.status
        )
      ) {
        return errorResponse(
          "Only pending reporters can be approved."
        );
      }

      const reporterId =
        reporter.reporterId ??
        (await generateReporterId());

      const updatedReporter =
        await prisma.$transaction(
          async (tx) => {

            const updated =
              await tx.reporter.update({
                where: {
                  id,
                },

                data: {
                  reporterId,

                  status:
                    ReporterStatus.APPROVED,

                  approvedAt:
                    new Date(),

                  rejectReason:
                    null,

                  active:
                    true,

                  verified:
                    true,

                  remarks:
                    remarks ??
                    reporter.remarks,
                },
              });

            const existingCard =
              await tx.pressCard.findUnique({
                where: {
                  reporterId:
                    reporter.id,
                },
              });

            if (!existingCard) {

              const issueDate =
                new Date();

              const expiryDate =
                new Date();

              expiryDate.setFullYear(
                expiryDate.getFullYear() + 1
              );

              await tx.pressCard.create({
                data: {
                  reporterId:
                    reporter.id,

                  cardNumber:
                    reporterId.replace(
                      "REP",
                      "CARD"
                    ),

                  issueDate,

                  expiryDate,

                  active: true,
                },
              });
            }

            return updated;
          }
        );

      await logReporterActivity({
        reporterId: id,

        action:
          ReporterActivityType.APPROVED,

        title:
          "Reporter Approved",

        description:
          "Reporter application approved by administrator.",

        performedBy:
          "Admin",
      });

      await logReporterActivity({
        reporterId: id,

        action:
          ReporterActivityType.PRESS_CARD_GENERATED,

        title:
          "Press Card Generated",

        description:
          "Official press card generated automatically.",

        performedBy:
          "System",
      });

      return NextResponse.json({
        success: true,

        message:
          "Reporter approved successfully.",

        reporter:
          updatedReporter,
      });
    }

    /* ==================================================
       REJECT
    ================================================== */

    if (action === "REJECT") {

      if (
        !canReject(
          reporter.status
        )
      ) {
        return errorResponse(
          "Only pending reporters can be rejected."
        );
      }

      const updatedReporter =
        await prisma.reporter.update({
          where: {
            id,
          },

          data: {
            status:
              ReporterStatus.REJECTED,

            rejectedAt:
              new Date(),

            rejectReason:
              rejectReason ||
              "Application rejected.",

            active:
              false,

            verified:
              false,

            remarks:
              remarks ??
              reporter.remarks,
          },
        });

      await logReporterActivity({
        reporterId: id,

        action:
          ReporterActivityType.REJECTED,

        title:
          "Application Rejected",

        description:
          rejectReason ||
          "Reporter application rejected.",

        performedBy:
          "Admin",

        remarks,
      });

      return NextResponse.json({
        success: true,

        message:
          "Reporter rejected successfully.",

        reporter:
          updatedReporter,
      });
    }

    /* ==================================================
       SUSPEND
    ================================================== */

    if (action === "SUSPEND") {

      if (
        !canSuspend(
          reporter.status
        )
      ) {
        return errorResponse(
          "Only approved reporters can be suspended."
        );
      }

      const updatedReporter =
        await prisma.reporter.update({
          where: {
            id,
          },

          data: {
            status:
              ReporterStatus.SUSPENDED,

            active:
              false,

            verified:
              false,

            remarks,
          },
        });

      await logReporterActivity({
        reporterId: id,

        action:
          ReporterActivityType.BLOCKED,

        title:
          "Reporter Suspended",

        description:
          "Reporter account suspended by administrator.",

        performedBy:
          "Admin",

        remarks,
      });

      return NextResponse.json({
        success: true,

        message:
          "Reporter suspended successfully.",

        reporter:
          updatedReporter,
      });
    }

    /* ==================================================
       ACTIVATE
    ================================================== */

    if (action === "ACTIVATE") {

      if (
        !canActivate(
          reporter.status
        )
      ) {
        return errorResponse(
          "Only suspended or rejected reporters can be activated."
        );
      }

      const updatedReporter =
        await prisma.reporter.update({
          where: {
            id,
          },

          data: {
            status:
              ReporterStatus.APPROVED,

            active:
              true,

            verified:
              true,

            remarks:
              remarks ??
              reporter.remarks,
          },
        });

      await logReporterActivity({
        reporterId: id,

        action:
          ReporterActivityType.ACTIVATED,

        title:
          "Reporter Activated",

        description:
          "Reporter account activated by administrator.",

        performedBy:
          "Admin",

        remarks,
      });

      return NextResponse.json({
        success: true,

        message:
          "Reporter activated successfully.",

        reporter:
          updatedReporter,
      });
    }

    /* ==================================================
       INVALID ACTION
    ================================================== */

    return errorResponse(
      "Invalid action."
    );

  } catch (error) {

    console.error(
      "Reporter Update Error:",
      error
    );

    return errorResponse(
      error instanceof Error
        ? error.message
        : "Failed to update reporter.",
      500
    );
  }
}

/* ======================================================
   DELETE REPORTER
   ADMIN ONLY
====================================================== */

export async function DELETE(
  req: NextRequest
) {

  if (!(await isAdmin())) {
    return errorResponse(
      "Only administrators can delete reporters.",
      403
    );
  }

  try {

    const {
      searchParams,
    } = new URL(req.url);

    const id =
      searchParams.get("id");

    if (!id) {
      return errorResponse(
        "Reporter id is required."
      );
    }

    const reporter =
      await prisma.reporter.findUnique({
        where: {
          id,
        },

        include: {
          ReporterDocument: true,
          PressCard: true,
        },
      });

    if (!reporter) {
      return errorResponse(
        "Reporter not found.",
        404
      );
    }

    await prisma.$transaction(
      async (tx) => {

        /* ---------------------------------------
           Log Activity
        --------------------------------------- */

        await tx.reporterActivity.create({
          data: {
            reporterId:
              id,

            action:
              ReporterActivityType.PROFILE_UPDATED,

            title:
              "Reporter Deleted",

            description:
              "Reporter profile deleted by administrator.",

            performedBy:
              "Admin",
          },
        });

        /* ---------------------------------------
           Reporter Documents
        --------------------------------------- */

        await tx.reporterDocument.deleteMany({
          where: {
            reporterId:
              id,
          },
        });

        /* ---------------------------------------
           Press Card
        --------------------------------------- */

        await tx.pressCard.deleteMany({
          where: {
            reporterId:
              id,
          },
        });

        /* ---------------------------------------
           Activity History
        --------------------------------------- */

        await tx.reporterActivity.deleteMany({
          where: {
            reporterId:
              id,
          },
        });

        /* ---------------------------------------
           Reporter
        --------------------------------------- */

        await tx.reporter.delete({
          where: {
            id,
          },
        });
      }
    );

    return NextResponse.json({
      success: true,

      message:
        "Reporter deleted successfully.",
    });

  } catch (error) {

    console.error(
      "Delete Reporter Error:",
      error
    );

    return errorResponse(
      error instanceof Error
        ? error.message
        : "Failed to delete reporter.",
      500
    );
  }
}