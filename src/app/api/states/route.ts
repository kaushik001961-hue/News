import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const states = await prisma.state.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(states);
}