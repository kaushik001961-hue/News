import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data: any = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      image: body.image,
      role: body.role,
      status: body.status,
    };

    if (body.password) {
      data.password = await bcrypt.hash(
        body.password,
        10
      );
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(user);

  } catch {
    return NextResponse.json(
      {
        error: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch {
    return NextResponse.json(
      {
        error: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}