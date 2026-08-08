import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getReporterId(userId: string) {
  const reporter = await prisma.reporter.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  return reporter?.id;
}

/* ===========================
   GET
=========================== */

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const reporterId = await getReporterId(session.user.id);

    if (!reporterId) {
      return NextResponse.json(
        { error: "Reporter not found." },
        { status: 404 }
      );
    }

    let preference =
      await prisma.reporterNotificationPreference.findUnique({
        where: {
          reporterId,
        },
      });

    if (!preference) {
      preference =
        await prisma.reporterNotificationPreference.create({
          data: {
            reporterId,
          },
        });
    }

    return NextResponse.json(preference);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ===========================
   PUT
=========================== */

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const reporterId = await getReporterId(session.user.id);

    if (!reporterId) {
      return NextResponse.json(
        { error: "Reporter not found." },
        { status: 404 }
      );
    }

    const body = await req.json();

    const preference =
      await prisma.reporterNotificationPreference.upsert({
        where: {
          reporterId,
        },
        create: {
          reporterId,

          emailNotifications:
            body.emailNotifications,

          breakingNewsAlerts:
            body.breakingNewsAlerts,

          assignmentNotifications:
            body.assignmentNotifications,

          newsApprovalAlerts:
            body.newsApprovalAlerts,

          pressCardNotifications:
            body.pressCardNotifications,

          systemNotifications:
            body.systemNotifications,
        },

        update: {
          emailNotifications:
            body.emailNotifications,

          breakingNewsAlerts:
            body.breakingNewsAlerts,

          assignmentNotifications:
            body.assignmentNotifications,

          newsApprovalAlerts:
            body.newsApprovalAlerts,

          pressCardNotifications:
            body.pressCardNotifications,

          systemNotifications:
            body.systemNotifications,
        },
      });

    return NextResponse.json(preference);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}