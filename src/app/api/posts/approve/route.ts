import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { status: "PUBLISHED" },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Failed to approve post:", error);
    return NextResponse.json({ error: "Failed to approve post" }, { status: 500 });
  }
}