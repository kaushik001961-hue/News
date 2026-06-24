
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads"
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const filename =
      Date.now() + "-" + file.name.replace(/\s/g, "-");

    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, buffer);

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
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}
