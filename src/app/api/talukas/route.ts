import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const districtId =
      req.nextUrl.searchParams.get("districtId");

    const talukas = await prisma.taluka.findMany({
      where: districtId ? { districtId } : {},
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(talukas);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch talukas" },
      { status: 500 }
    );
  }
}