import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const stateId = req.nextUrl.searchParams.get("stateId");

    const districts = await prisma.district.findMany({
      where: stateId ? { stateId } : {},
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(districts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch districts" },
      { status: 500 }
    );
  }
}