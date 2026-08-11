import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function canView() {
  const session = await auth();

  return (
    session?.user?.role === "ADMIN" ||
    session?.user?.role === "EDITOR"
  );
}

export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    if (!(await canView())) {
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

    const { id } = await params;

    const advertisement =
      await prisma.advertisement.findUnique({
        where: {
          id,
        },
      });

    if (!advertisement) {
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

    return NextResponse.json({
      success: true,
      advertisement,
    });
  } catch (error) {
    console.error(
      "GET Advertisement Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch advertisement.",
      },
      {
        status: 500,
      }
    );
  }
}