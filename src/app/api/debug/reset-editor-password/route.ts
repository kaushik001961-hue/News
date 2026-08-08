import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const email = "editor@news.com";
  const newPassword = "editor123";

  const hash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hash,
    },
  });

  return NextResponse.json({
    success: true,
    email,
    password: newPassword,
  });
}