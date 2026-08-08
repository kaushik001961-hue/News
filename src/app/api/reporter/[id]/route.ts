import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

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

  return NextResponse.json(reporter);
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  await prisma.reporter.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;
  const body = await request.json();

  const reporter = await prisma.reporter.update({
    where: {
      id,
    },
    data: body,
  });

  return NextResponse.json(reporter);
}