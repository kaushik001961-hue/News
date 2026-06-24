import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import path from "path";



export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug =
      (formData.get("slug") as string) ||
      title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const talukaId = formData.get("talukaId") as string;
    

    const image = formData.get("image") as File | null;
    const video = formData.get("video") as File | null;

    let imagePath: string | null = null;
    let videoPath: string | null = null;

    // Save image
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = Date.now() + "-" + image.name;
      await writeFile(path.join(process.cwd(), "public/uploads/images", fileName), buffer);
      imagePath = "/uploads/images/" + fileName;
    }

    // Save video
    if (video && video.size > 0) {
      const buffer = Buffer.from(await video.arrayBuffer());
      const fileName = Date.now() + "-" + video.name;
      await writeFile(path.join(process.cwd(), "public/uploads/videos", fileName), buffer);
      videoPath = "/uploads/videos/" + fileName;
    }

const post = await prisma.post.create({
  data: {
    title,
    slug,
    content,
    image: imagePath,
    video: videoPath,

    categoryId: categoryId || null,
    talukaId: talukaId || null,

    authorId: user.id,
  },
});

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}