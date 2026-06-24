import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      status: "PENDING",
    },
  });

  return NextResponse.json(updatedPost);
}