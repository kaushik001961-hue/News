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

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <DashboardLayout
  role={session.user.role as any}
  user={session.user as any}
>
  {children}
</DashboardLayout>
  );
}