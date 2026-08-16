import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  console.log(
    "[AUTH PROXY]",
    pathname,
    session?.user
      ? {
          id: session.user.id,
          email: session.user.email,
          role: session.user.role,
        }
      : "NO SESSION"
  );

  // =========================
  // ADMIN
  // =========================

  if (pathname.startsWith("/admin")) {
    if (!session?.user) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    const role = session.user.role;

    if (role !== "ADMIN" && role !== "REPORTER") {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }
  }

  // =========================
  // EDITOR
  // =========================

  if (pathname.startsWith("/editor")) {
    if (!session?.user) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    if (session.user.role !== "EDITOR") {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }
  }

  // =========================
  // REPORTER
  // =========================

  if (pathname.startsWith("/reporter")) {
    if (!session?.user) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    if (session.user.role !== "REPORTER") {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/editor/:path*",
    "/reporter/:path*",
  ],
};