import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET ALL REPORTERS
export async function GET() {

  try {

    const reporters = await prisma.user.findMany({

      where: {
        role: {
          in: ["REPORTER", "EDITOR", "ADMIN"],
        },
      },

      include: {
        posts: true,
      },

      orderBy: {
        createdAt: "desc",
      },

    });

    const data = reporters.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      role: r.role,
      status: r.status,
      postsCount: r.posts.length,
    }));

    return NextResponse.json(data);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch reporters" },
      { status: 500 }
    );

  }

}

// CREATE REPORTER
export async function POST(req: Request) {

  try {

    const body = await req.json();

    const exists = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({

      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        phone: body.phone,
        role: body.role,
        status: body.status,
      },

    });

    return NextResponse.json(user);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to create reporter" },
      { status: 500 }
    );

  }

}
