import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  return NextResponse.json(post);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  

  const {
    title,
    content,
    breaking,
    featured,
  } = await req.json();

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      breaking,
      featured,
    },
  });

  return NextResponse.json(post);
}