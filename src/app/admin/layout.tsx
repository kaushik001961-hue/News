import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role;

  /*
   * ADMIN and EDITOR can access
   * the shared management pages.
   */
  if (
    role !== "ADMIN" &&
    role !== "EDITOR"
  ) {
    redirect("/");
  }

  return (
    <DashboardLayout
      role={role}
      user={session.user as any}
    >
      {children}
    </DashboardLayout>
  );
}