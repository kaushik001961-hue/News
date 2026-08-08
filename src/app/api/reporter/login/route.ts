import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret"
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email/Reporter ID and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const reporter = await prisma.reporter.findFirst({
      where: {
        OR: [
          {
            email: identifier,
          },
          {
            reporterId: identifier,
          },
        ],
      },
      include: {
        user: true,
      },
    });

    if (!reporter) {
      return NextResponse.json(
        {
          success: false,
          message: "Reporter not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (reporter.status !== "APPROVED") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your account is not approved. Please contact the administrator.",
        },
        {
          status: 403,
        }
      );
    }

    // Resolves password from the related user account or optional reporter field safely
    const passwordHash =
      reporter.user?.password ?? (reporter as any).password;

    if (!passwordHash) {
      return NextResponse.json(
        {
          success: false,
          message: "Password has not been set for this account.",
        },
        {
          status: 400,
        }
      );
    }

    const match = await bcrypt.compare(password, passwordHash);

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password.",
        },
        {
          status: 401,
        }
      );
    }

    const token = await new SignJWT({
      id: reporter.id,
      reporterId: reporter.reporterId,
      role: "REPORTER",
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set({
      name: "reporter_token",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}