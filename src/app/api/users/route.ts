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

    // Never expose password hashes
    const safeUsers = users.map(({ password, ...user }) => user);

    return NextResponse.json(safeUsers);
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users.",
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

    // -----------------------------
    // Validation
    // -----------------------------
    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!password?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Password is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Normalize Email
    // -----------------------------
    const normalizedEmail = email.trim().toLowerCase();

    // -----------------------------
    // Check Existing User
    // -----------------------------
    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // -----------------------------
    // Hash Password
    // -----------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // -----------------------------
    // Create User
    // -----------------------------
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || null,
        image: image || null,
        role,
        status,
        password: hashedPassword,
      },
    });

    // Remove password before returning
    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully.",
        user: safeUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create user.",
      },
      {
        status: 500,
      }
    );
  }
}