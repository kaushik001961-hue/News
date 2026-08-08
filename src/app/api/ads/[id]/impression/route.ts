import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  await prisma.adImpression.create({
    data: {
      advertisementId: id,
    },
  });

  await prisma.advertisement.update({
    where: {
      id,
    },
    data: {
      impressions: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({
    success: true,
  });
}