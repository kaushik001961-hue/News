import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(req: NextRequest) {
  const token = await getToken({
  req,
  secret: process.env.NEXTAUTH_SECRET,
});

console.log("TOKEN:", token);

  const { pathname } = req.nextUrl;

  // Public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Login required
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ===========================
  // ADMIN AREA
  // ADMIN + REPORTER
  // ===========================
  if (pathname.startsWith("/admin")) {
    if (
      token.role !== "ADMIN" &&
      
      token.role !== "REPORTER"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ===========================
  // EDITOR AREA
  // ===========================
  if (pathname.startsWith("/editor")) {
    if (token.role !== "EDITOR") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ===========================
  // REPORTER AREA
  // ===========================
  if (pathname.startsWith("/reporter")) {
    if (token.role !== "REPORTER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/editor/:path*",
    "/reporter/:path*",
  ],
};