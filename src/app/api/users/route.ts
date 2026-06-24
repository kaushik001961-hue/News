
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      image,
      role,
      status,
      password,
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name, email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        image,
        role,
        status,
        password: hashedPassword,
      },
    });

    /*
    Future Activity Log

    await logActivity({
      userId: session.user.id,
      action: "CREATE_USER",
      entity: "User",
      entityId: user.id,
      ip: req.headers.get("x-forwarded-for"),
      browser: req.headers.get("user-agent"),
    });
    */

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully.",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to create user.",
      },
      {
        status: 500,
      }
    );
  }
}
