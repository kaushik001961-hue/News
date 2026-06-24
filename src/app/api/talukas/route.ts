import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const talukas = await prisma.taluka.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(talukas);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch talukas" }, { status: 500 });
  }
}