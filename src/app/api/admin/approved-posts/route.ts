export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this import to match your project setup

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: "PUBLISHED", // or whatever your status field requires
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching approved posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}