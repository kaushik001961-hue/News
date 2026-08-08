import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (session.user.role !== "REPORTER") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const reporter = await prisma.reporter.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        PressCard: true,
      },
    });

    if (!reporter) {
      return NextResponse.json(
        { error: "Reporter not found" },
        { status: 404 }
      );
    }

    if (!reporter.PressCard) {
      return NextResponse.json(
        { error: "Press card not issued yet" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      reporterId: reporter.reporterId ?? "",

      firstName: reporter.firstName,
      middleName: reporter.middleName ?? "",
      lastName: reporter.lastName,

      designation:
        reporter.PressCard.designation ??
        reporter.designation ??
        "",

      phone: reporter.phone,
      email: reporter.email,

      district: reporter.district ?? "",
      state: reporter.state ?? "",

      bloodGroup: reporter.bloodGroup ?? "",

     dob: reporter.dob
  ? new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(reporter.dob)
  : "",

      beat: reporter.beat ?? "",
      coverageArea: reporter.coverageArea ?? "",

      qualification: reporter.qualification ?? "",

      experience: reporter.experience,

      emergencyName:
        reporter.emergencyName ?? "",

      emergencyPhone:
        reporter.emergencyPhone ?? "",

      photo:
        reporter.PressCard.photoOverride ??
        reporter.photo ??
        "",

      barcode: reporter.PressCard.cardNumber,

      qrCode: reporter.PressCard.qrCode ?? "",

      issueDate:
        reporter.PressCard.issueDate.toISOString(),

      expiryDate:
        reporter.PressCard.expiryDate.toISOString(),

      authority: "AGS NEWS",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}