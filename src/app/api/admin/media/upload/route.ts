import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {

  try {

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;

    const uploadPath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(uploadPath, buffer);

    const media = await prisma.media.create({

      data: {
        filename,
        originalName: file.name,
        url: `/uploads/${filename}`,
        mimeType: file.type,
        size: file.size,
      },

    });

    return NextResponse.json(media);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );

  }

}
