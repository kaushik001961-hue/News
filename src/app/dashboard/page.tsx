import { redirect } from "next/navigation";

// Change this line to point to your NextAuth route file:
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardRedirectPage() {
const session = await auth();

  // 1. If the user is not authenticated, send them to the login screen
  if (!session) {
    redirect("/login");
  }

  // 2. Role-based routing depending on their permissions
  if (session?.user?.role === "ADMIN") {
    redirect("/admin");
  } else if (session?.user?.role === "REPORTER") {
    redirect("/reporter");
  } else if (session?.user?.role === "EDITOR") {
    redirect("/editor");
  }

  // 3. Fallback default redirect if no custom roles are matched
  redirect("/");
}