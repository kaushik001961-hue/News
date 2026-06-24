import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Guard against unauthorized requests and ensure we have a valid user ID
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Parse the request body JSON completely
    const body = await req.json();

    // 3. Extract all fields explicitly out of the body
    const { 
      title, 
      content, 
      categoryId, 
      talukaId, 
      image, // matching standard property names from your state structures
      video 
    } = body;

    // 4. Fallback slug generator if not passed down by frontend
    const slug = title
      ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : `post-${Date.now()}`;

    // 5. Build database entry using the extracted scope
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        image: image || null,
        video: video || null,
        categoryId: categoryId || null,
        talukaId: talukaId || null, 
        authorId: session.user.id, // Linked securely to the current session user
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}