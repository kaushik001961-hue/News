
import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/admin/users") &&
    role !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
