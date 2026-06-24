import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        status: "PUBLISHED",
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to publish post" },
      { status: 500 }
    );
  }
}