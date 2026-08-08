import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    await prisma.reporter.update({
      where: {
        id,
      },
      data: {
        status: "REJECTED",
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to reject reporter" },
      { status: 500 }
    );
  }
}