import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
    
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { photo } = await req.json();

    if (!photo) {
      return NextResponse.json(
        { message: "Photo is required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        reporter: true,
      },
    });

    if (!user || !user.reporter) {
      return NextResponse.json(
        { message: "Reporter not found." },
        { status: 404 }
      );
    }

    const reporter = await prisma.reporter.update({
      where: {
        id: user.reporter.id,
      },
      data: {
        photo,
      },
    });

    return NextResponse.json({
      success: true,
      photo: reporter.photo,
      message: "Profile photo updated successfully.",
    });
  } catch (error) {
    console.error("Profile photo update failed:", error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}