import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReporterId } from "@/lib/reporterId";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;

    const reporter = await prisma.reporter.findUnique({
      where: {
        id,
      },
    });

    if (!reporter) {
      return NextResponse.json(
        { error: "Reporter not found" },
        { status: 404 }
      );
    }

    const reporterId = await generateReporterId();

    await prisma.reporter.update({
      where: {
        id,
      },
      data: {
        status: "APPROVED",
        reporterId,
        approvedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      reporterId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to approve reporter" },
      { status: 500 }
    );
  }
}