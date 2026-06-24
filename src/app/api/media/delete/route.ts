import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function DELETE(
  req: NextRequest
) {
  const id =
    req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id" },
      { status: 400 }
    );
  }

  const media = await prisma.media.findUnique({
    where: {
      id,
    },
  });

  if (!media) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  const file = path.join(
    process.cwd(),
    "public",
    media.url
  );

  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }

  await prisma.media.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
